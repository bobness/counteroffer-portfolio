const express = require("express");
const router = express.Router();

router.get("/:username", async (req, res, next) => {
  const userResult = await req.client.query({
    text: "select id from users where username = $1::text",
    values: [req.params.username],
  });
  const userId = Number(userResult.rows[0].id);
  const result = await req.client.query({
    text: `select * from questions 
    where user_id = $1::integer 
    order by required desc, id asc`,
    values: [userId],
  });
  req.client.release();
  return res.json(result.rows);
});

const renderEmail = (questions, sortedResponses) => {
  return sortedResponses
    .map((response) => {
      const question = questions.find((q) => q.id === response.question_id);
      // TODO: format response.value based on question.type
      return `
      <p><strong>${question.question}</strong></p>
      <p>${response.value}</p>
      `;
    })
    .join("\n");
};

router.post("/:username", async (req, res, next) => {
  const user = await req.client
    .query({
      text: "select * from users where username = $1::text",
      values: [req.params.username],
    })
    .then((result) => {
      if (result.rows.length === 1) {
        return result.rows[0];
      }
      return undefined;
    });
  if (user) {
    const questions = await req.client
      .query({
        text: "select * from questions where user_id = $1::integer",
        values: [Number(user.id)],
      })
      .then((result) => result.rows);
    const questionIds = questions.map((q) => Number(q.id));
    const responses = req.body;
    const responsesMatchQuestions = responses.reduce(
      (matchingResult, response) => {
        return (
          matchingResult && questionIds.includes(Number(response.question_id))
        );
      },
      true
    );
    if (!responsesMatchQuestions) {
      req.client.release();
      return res.sendStatus(400);
    }
    // TODO: send email in req.body instead of response.sender?
    const senderEmail = String(responses[0].sender); // assuming they are all the same
    const newJob = await req.client
      .query({
        text: "insert into jobs (user_id, email) values ($1::integer, $2::text) returning *",
        values: [Number(user.id), senderEmail],
      })
      .then((result) => result.rows[0]);
    const sortedResponses = responses.sort(
      (a, b) => Number(a.question_id) - Number(b.question_id)
    );
    await Promise.all(
      sortedResponses.map(
        async (r) =>
          await req.client.query({
            text: "insert into messages (job_id, question_id, value, sender) values ($1::integer, $2::integer, $3::text, $4::text)",
            values: [
              Number(newJob.id),
              Number(r.question_id),
              r.value,
              r.sender,
            ],
          })
      )
    );
    req.client.release();
    await req.smtp.sendMail({
      from: `"${senderEmail}" <hit-reply@datagotchi.net>`,
      replyTo: senderEmail,
      to: user.email,
      subject: "Counteroffer Survey Response",
      html: renderEmail(questions, sortedResponses),
    });
    res.sendStatus(201);
  } else {
    req.client.release();
    res.sendStatus(404);
  }
});

module.exports = router;
