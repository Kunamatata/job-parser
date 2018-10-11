const parser = require('rss-parser');
const queryString = require('query-string');

const queryParams = {
    location: "l",
    query: "q",
}

const stackoverflowRssFeed = "https://stackoverflow.com/jobs/feed"

let Parser = new parser();

async function getFeed(options){
    let params = queryString.stringify(options);
    params = params.replace("location", queryParams.location);
    params = params.replace("query", queryParams.query);
    let feed = await Parser.parseURL(stackoverflowRssFeed + "?" + params);
    return feed;
}

module.exports = getFeed;
