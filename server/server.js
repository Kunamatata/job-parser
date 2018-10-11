const express = require('express');
const feedManager = require('./feedManager');
const DatabaseManager = require('./Database/DatabaseManager');

const app = express();
const databaseManager = new DatabaseManager();
databaseManager.initialize();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/jobs", (req, res) => {
  let jobs = [];
  feedManager.mergeFeed().then(data => {
    data.forEach(feed => {
      feed.items.forEach(item => {
        jobs.push(item);
      })
    })
    let result = {
      "jobs": jobs
    };
    res.json(result);
  });
})

databaseManager.getJobs().then(data => {
  // console.log(data)
});

app.listen(3001);


module.exports = app;