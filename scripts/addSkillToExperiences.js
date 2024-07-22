const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  max: 50, // 10 is default
  idleTimeoutMillis: 10000, // 10000 is default
  connectionTimeoutMillis: 2000, // 0 (no timeout!) is default
});

// TODO: add this functionality to the web app
async function main() {
  let client;
  try {
    client = await pool.connect();
  } catch (err) {
    console.error(err);
    console.error("*** totalCount", pool.totalCount);
    console.error("*** idleCount", pool.idleCount);
    console.error("*** waitingCount", pool.waitingCount);
    console.error("*** so, exiting!");
    process.exit();
  }
  if (process.argv.length < 4) {
    console.log(
      "Usage: node addSkillToExpeirences.js [skill] [...experience regexes]"
    );
  }
  const skill = process.argv[2];
  const experienceRegexes = process.argv.slice(3);
  try {
    await Promise.all(
      experienceRegexes.map((companyRegex) =>
        client.query({
          text: `
            insert into tags (experience_id, value) 
            values ((select id from experiences where company like $1::text), $2::text)
            on conflict do nothing`,
          values: [`%${companyRegex}%`, skill],
        })
      )
    );
  } catch (err) {
    console.error(err);
  }

  client.end();
}

main();
