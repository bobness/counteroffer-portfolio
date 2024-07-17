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
  // TODO: create new theme with specified name and skills (tags)
  if (process.argv.length < 5) {
    console.log("Usage: node newjob.js [themeName] [...skills]");
  }
  const name = process.argv[2];
  const url = process.argv[3];
  const tags = process.argv.slice(4);
  try {
    await client
      .query({
        text: `insert into themes (user_id, name, tags) 
          values ($1::integer, $2::text, $3::text[]) 
          returning id`,
        values: [1, name, tags],
      })
      .then(async (results) => {
        const { id: themeId } = results.rows[0];
        await client.query({
          text: `insert into facts (user_id, theme_id, key, value) 
          values ($1::integer, $2::integer, 'Job Listing', $3::text)`,
          values: [1, themeId, url],
        });
      });
  } catch (err) {
    console.error(err);
  }

  client.end();
}

main();
