const feedManager = require('../feedManager');
const DatabaseManager = require('../Database/DatabaseManager');

const databaseManager = new DatabaseManager();
databaseManager.initialize();

feedManager.mergeFeed().then(data => {
    data.forEach(feed => {
        feed.items.forEach(item => {
            databaseManager.insertJob(item);
        })
    })
}).catch(e => {
    console.log(e)
})