const express = require('express');
const cache = require('./middleware/cache');
const compression = require('compression')
const DatabaseManager = require('./Database/DatabaseManager');

const app = express();

app.use(compression())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const databaseManager = new DatabaseManager();
databaseManager.initialize();

app.get("/jobs", cache(30), async (req, res) => {
  const data = await databaseManager.getJobs();
  res.json({
    'jobs': data
  })
})

app.listen(3001);


module.exports = app;