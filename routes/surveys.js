const express = require("express");
const router = express.Router();

router.get("/:user_id", async (req, res, next) => {
  const result = await req.client.query({
    text: "select * from questions where user_id = $1::integer",
    values: [Number(req.params.user_id)],
  });
  req.client.release();
  return res.json(result.rows);
});

router.post("/:user_id", async (req, res, next) => {
  const user = await req.client
    .query({
      text: "select * from users where id = $1::integer",
      values: [Number(req.params.user_id)],
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
        text: "select id from questions where user_id = $1::integer",
        values: [Number(user.id)],
      })
      .then((result) => result.rows);
    const questionIds = questions.map((q) => Number(q.id));
    const responses = req.body;
    console.log("*** got responses: ", responses);
    // TODO: even better, it should be 1-to-1
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
    await Promise.all(
      responses
        .sort((a, b) => Number(b.question_id) - Number(a.question_id))
        .map(
          async (r) =>
            await req.client.query({
              text: "insert into messages (question_id, value, sender) values ($1::integer, $2::text, $3::text)",
              values: [Number(r.question_id), r.value, r.sender],
            })
        )
    );
    req.client.release();
    res.sendStatus(201);
  } else {
    req.client.release();
    res.sendStatus(404);
  }
});

module.exports = router;
