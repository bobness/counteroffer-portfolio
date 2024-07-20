const express = require("express");
const router = express.Router();

const getTagsForExperience = (req, experience_id) =>
  req.client
    .query({
      text: "select value from tags where experience_id = $1::integer order by value asc",
      values: [Number(experience_id)],
    })
    .then((response) => response.rows);

const getPubsForExperience = (req, experience_id) =>
  req.client
    .query({
      text: "select * from publications where experience_id = $1::integer order by date asc",
      values: [Number(experience_id)],
    })
    .then((response) => response.rows);

router.get("/:username", async (req, res, next) => {
  const username = req.params.username;
  const userResult = await req.client.query({
    text: "select * from users where username = $1::text",
    values: [username],
  });
  if (userResult.rows.length === 1) {
    const user = userResult.rows[0];
    const userId = Number(user.id);
    const factsResult = await req.client.query({
      text: "select * from facts where user_id = $1::integer",
      values: [userId],
    });
    const facts = factsResult.rows;
    const experiencesResult = await req.client.query({
      text: `select * from experiences 
      where user_id = $1::integer
      order by enddate desc, startdate desc`,
      values: [userId],
    });
    let experiences = experiencesResult.rows;
    await Promise.all(
      experiences.map(async (e) => {
        e.tags = await getTagsForExperience(req, e.id);
        e.publications = await getPubsForExperience(req, e.id);
      })
    );
    const education = experiences.filter((exp) => exp.is_education);
    const lastEducation = education.sort((a, b) => a.enddate - b.endddate)[0];
    const professionalExperiences = experiences
      .filter((exp) => !exp.is_education)
      .filter((exp) => exp.startdate >= lastEducation.startdate);
    const publications = await req.client
      .query({
        text: "select * from publications where user_id = $1::integer",
        values: [userId],
      })
      .then((response) => response.rows);
    const themesResult = await req.client.query({
      text: "select * from themes where user_id = $1::integer",
      values: [userId],
    });
    const themes = themesResult.rows;
    req.client.release();
    return res.json({
      name: user.name,
      email: user.email,
      location: user.location,
      phone: user.phone,
      facts,
      professionalExperiences,
      education,
      publications,
      themes,
    });
  } else {
    req.client.release();
    return res.sendStatus(404);
  }
});

module.exports = router;
