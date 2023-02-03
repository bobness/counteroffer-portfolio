const express = require("express");
const router = express.Router();

const getTagsForExperience = (req, experience_id) =>
  req.client
    .query({
      text: "select value from tags where experience_id = $1::integer",
      values: [Number(experience_id)],
    })
    .then((response) => response.rows);

router.get("/:user_id", async (req, res, next) => {
  const userId = Number(req.params.user_id);
  const userResult = await req.client.query({
    text: "select * from users where id = $1::integer",
    values: [userId],
  });
  if (userResult.rows.length === 1) {
    const user = userResult.rows[0];
    const factsResult = await req.client.query({
      text: "select * from facts where user_id = $1::integer",
      values: [userId],
    });
    const facts = factsResult.rows;
    const experiencesResult = await req.client.query({
      text: "select * from experiences where user_id = $1::integer",
      values: [userId],
    });
    const experiences = experiencesResult.rows;
    await Promise.all(
      experiences.map(async (e) => {
        const tags = await getTagsForExperience(req, e.id);
        e.tags = tags;
      })
    );
    return res.json({
      name: user.username,
      facts,
      experiences,
    });
  } else {
    return res.sendStatus(404);
  }
});

module.exports = router;
