require('dotenv').config();
const { Pool, Client } = require('pg');

/**
 * TODO: Move connection string to .env variable
 */
class DatabaseManager {
  constructor() {
    this.connectionString = process.env.PG_URL
    this.pool = null;
  }

  initialize() {
    this.pool = new Pool({
      connectionString: this.connectionString,
    });
  }

  async getJobs() {
    const res = await this.pool.query(`SELECT id, title, (pubdate at time zone 'utc' AT TIME ZONE 'pst') as pubdate from jobs`);
    return res.rows;
  };

  async insertJob(job){
      const query = `INSERT INTO jobs(pubDate, title) VALUES($1, $2)`;
      try{
        await this.pool.query(query, [job.pubDate, job.title]);
      }catch(e){
        throw Error(e.message)
      }
  }
}

module.exports = DatabaseManager;