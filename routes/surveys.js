const express = require("express");
const router = express.Router();

router.get("/:user_id", async (req, res, next) => {
  const result = await req.client.query({
    text: "select * from questions where user_id = $1::integer",
    values: [Number(req.params.user_id)],
  });
  return res.json(result.rows);
});

module.exports = router;
