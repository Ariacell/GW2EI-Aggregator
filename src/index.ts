import { startServer } from './startServer';
import express from 'express';
import { uploadFiles } from './logAggregator/logAggregator';

const app = startServer();

//Serve frontend temporarily until separate service added to sit in front of serverless aggregator
app.use(express.static(__dirname + '/frontend'));
app.get('/', (req, res) => res.sendFile(__dirname + '/frontend/index.html'));

//Use express app as intermediary while developing aggregator logic
app.post('/upload_files', uploadFiles);
