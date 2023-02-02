const express = require("express");
const router = express.Router();

router.get("/:user_id", async (req, res, next) => {
  console.log("*** in /portfolios/" + req.params.user_id);
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
