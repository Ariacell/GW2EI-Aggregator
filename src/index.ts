import { startServer } from './startServer';
import express from 'express';
import { aggregateJSONLogs } from './logAggregator/logAggregator';
import multer from 'multer';

const app = startServer();

//Serve frontend temporarily until separate service added to sit in front of serverless aggregator
app.use(express.static(__dirname + '/frontend'));
app.get('/', (req, res) => res.sendFile(__dirname + '/frontend/index.html'));

//Use express app as intermediary while developing aggregator logic
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
app.post('/log-aggregator', upload.array('files'), (req, res) => res.send(aggregateJSONLogs(req, res)));
