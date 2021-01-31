const express = require('express');
const app = express();
const port = process.env.PORT || 8085;
const CronJob = require('cron').CronJob;
const request = require('request');
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const {client} = require('./src/config/mongo/mongo-client');

app.use(cors());

new CronJob('* * */1 * * *', function () {
    request.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs', {json: true}, (err, res, data) => {
        if (!err) {
            const db = client.db('dbNews');
            const collection = db.collection('hits');
            if (data.hits && data.hits.length > 0) {
                data.hits.forEach(item => {
                    collection.find({'created_at': item.created_at}).toArray(function (err, docs) {
                        if (!err) {
                            if (docs.length === 0) {
                                collection.insertOne(item, function (err, result) {
                                    if (!err) {
                                        console.log(result.ops);
                                        client.close();
                                    }
                                });
                            }
                        }
                    });
                });
            }
        }
    });
}, function () {
}, true);

app.get('/getNews', (req, res) => {

    const db = client.db('dbNews');
    const collection = db.collection('hits');
    collection.find({}).sort({created_at: -1}).toArray(function (err, docs) {
        if (!err) {
            res.send(docs);
        }
    });
});

app.get('/noShowNews', (req, res) => {

    const db = client.db('dbNews');
    const collection = db.collection('hits');
    const id = new ObjectID(req.query.id);
    collection.findOneAndUpdate({'_id': id}, {$set: {title: null, story_title: null}}, function (err, doc) {
        if (!err) {
            res.send(doc);
        }
    });
});

app.use('/', express.static('public'));

app.listen(port, () => {
    client.connect();
    console.log(`Example app listening at http://localhost:${port}`)
});