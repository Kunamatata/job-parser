const { Pool, Client } = require('pg');

/**
 * TODO: Move connection string to .env variable
 */
class DatabaseManager {
  constructor() {
    this.connectionString = 'postgresql://postgres:lericain@localhost:5432/JobBoard'
    this.pool = null;
  }

  initialize() {
    this.pool = new Pool({
      connectionString: this.connectionString,
    });
  }

  async getJobs() {
    const res = await this.pool.query('SELECT * from jobs');
    return res.rows;
  };

  insertJob(job){
      const query = `INSERT INTO jobs(pubDate, title) VALUES('${job.pubDate}', '${job.title}')`;
      this.pool.query(query).then(res => console.log(res)).catch(e => console.log(e));
  }
}

module.exports = DatabaseManager;