import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import redflags from './db/db';

const app = express(); 

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));