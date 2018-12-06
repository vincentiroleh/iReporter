import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import redflags from './db/db';

const app = express(); 

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// <-----------------------For creating a redflag record -------------------------------------------------------------------------------------------------------------->
app.post('/api/v1/redflags', (req, res) => {
    const redflag = {
        id:         db.length + 1,
        title:      req.body.title,
        details:    req.body.details
    }
    db.push(redflag);
    return res.status(201).send({
        sucess: 'true',
        message: 'redflag added successfully',
        redflag
    });
});

// <-----------------------For getting all redflag record -------------------------------------------------------------------------------------------------------------->

app.get('/api/v1/redflags', (req, res) => {
    res.status(200).send(db);
});

// <-----------------------For getting a specific redflag record -------------------------------------------------------------------------------------------------------------->
app.get('/api/v1/redflags/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.map((redflag) => {
        if (redflag.id === id) return res.status(200).send(redflag);
    }); 
    return res.status(404).send({
        status: 'false',
        message: "Redflag does not exist"
    });
});

// server 
const PORT = 3000;
app.listen(PORT, () => {
    console.log('We are live on ' + PORT);
});

