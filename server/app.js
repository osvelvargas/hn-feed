const express = require('express');
const app = express();
const port = 8081;
const CronJob = require('cron').CronJob;
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');

app.use(cors());

new CronJob('* * */1 * * *', function() {
    request.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs', { json: true }, (err, res, data) => {
        if (!err){
            MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
                .then(client => {
                    const db = client.db('dbNews');
                    const collection = db.collection('hits');
                    if(data.hits && data.hits.length > 0){
                        data.hits.forEach(item => {
                            collection.find({'created_at': item.created_at}).toArray(function(err, docs) {
                                if(!err){
                                    if(docs.length === 0){
                                        collection.insertOne(item, function(err, result) {
                                            if(!err) {
                                                console.log(result.ops);
                                                client.close();
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    }
                }).catch(err => {
                console.log('connection error: ', err)
            });
        }
    });
}, function() {}, true);

app.get('/getNews', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
        .then(client => {
            const db = client.db('dbNews');
            const collection = db.collection('hits');
            collection.find({}).sort({created_at: -1}).toArray(function(err, docs) {
                if(!err){
                    res.send(docs);
                }
            });
        }).catch(err => {
            res.send({status:'500', message: 'connection error:' + err})
    });
});

app.get('/noShowNews', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
        .then(client => {
            const db = client.db('dbNews');
            const collection = db.collection('hits');
            const id = new ObjectID(req.query.id);
            collection.findOneAndUpdate({'_id': id},{$set: {title: null, story_title: null}}, function(err, doc) {
                if (!err) {
                        res.send(doc);
                    }
                });
            }).catch(err => {
        res.send({status:'500', message: 'connection error:' + err})
    });
});

app.use('/', express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
