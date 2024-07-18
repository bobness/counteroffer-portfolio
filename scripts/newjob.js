const { Pool } = require("pg");
const dotenv = require("dotenv");
// const { execSync } = require("child_process");

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
  if (process.argv.length < 4) {
    console.log("Usage: node newjob.js [themeName] [...skills]");
  }
  const name = process.argv[2];
  const tags = process.argv.slice(3);
  try {
    await client.query({
      text: `insert into themes (user_id, name, tags) 
          values ($1::integer, $2::text, $3::text[]) 
          returning id`,
      values: [1, name, tags],
    });
    // FIXME: dump command doesn't work
    // execSync(`pg_dump
    //   -U postgres
    //   -p ${process.env.DATABASE_PASSWORD}
    //   counteroffer
    //   > ../counteroffer-dump.sql`);
  } catch (err) {
    console.error(err);
  }

  client.end();
}

main();
