const parser = require('rss-parser');
const queryString = require('query-string');

const queryParams = {
    description: "description",
    location: "location",
}

const githubRssFeed = "https://jobs.github.com/positions.atom";

let Parser = new parser();


/** 
 * TODO: Add pagination loop because only 50 results are shown per page
 */
async function getFeed(options){
    let params = queryString.stringify(options);
    params = params.replace("location", queryParams.location);
    params = params.replace("description", queryParams.description);
    let feed = await Parser.parseURL(githubRssFeed + "?" + params);
    return feed;
}

module.exports = getFeed;
