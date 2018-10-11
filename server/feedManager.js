const Parser = require('rss-parser');
const stackflow = require('./sources/stackoverflowParser');
const github = require('./sources/githubParser');

function mergeFeed() {
  return new Promise((resolve, reject) => {
    Promise.all([github({description: "remote", location:""}), stackflow({query: "remote", location:""})]).then(data => {
      resolve(data);
    }).catch(err => {
      console.log(err);
    })
  }) 
}

module.exports = { mergeFeed };