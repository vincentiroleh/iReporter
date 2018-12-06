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
        status:     201,
        data:       redflag
    });
});

// <-----------------------For getting all redflag record -------------------------------------------------------------------------------------------------------------->

app.get('/api/v1/redflags', (req, res) => {
    res.status(200).send({
        status: 200,
        data: db
    });
});

// <-----------------------For getting a specific redflag record -------------------------------------------------------------------------------------------------------------->
app.get('/api/v1/redflags/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.map((redflag) => {
        if (redflag.id === id) return res.status(200).send({
            status: 200,
            data:   redflag
        });
    }); 
    return res.status(404).send({
        status:     404,
        error:    "Redflag does not exist"
    });
});

// <-----------------------For editing a specific redflag record -------------------------------------------------------------------------------------------------------------->
app.put('/api/v1/redflags/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let redflagFound;
    let itemIndex;
    
    db.map((redflag, index) => {
      if (redflag.id === id) {
        redflagFound = redflag;
        itemIndex = index;
      }
    });
  
    if (!redflagFound) {
      return res.status(404).send({
        status:     404,
        error:    'redflag not found',
      });
    }
  
    if (!req.body.title) {
      return res.status(400).send({
        status:     400,
        error:      'title is required',
      });
    } else if (!req.body.details) {
      return res.status(400).send({
        status:     400,
        data:       'details is required',
      });
    }
  
    const updatedRedflag = {
      id: redflagFound.id,
      title: req.body.title || redflagFound.title,
      details: req.body.details || redflagFound.details,
    };
  
    db.splice(itemIndex, 1, updatedRedflag);
  
    return res.status(201).send({
      status:   201,
      data: 'redflag added successfully',
      updatedRedflag,
    });
});

// <-----------------------For deleting a specific redflag record -------------------------------------------------------------------------------------------------------------->
app.delete('/api/v1/redflags/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.map((readflag, index) => {
        if (readflag.id === id){
            db.splice(index, 1);
            return res.status(200).send({
                status: 200,
                data: 'Redflag deleted successfully'
            });
        }
    });

    return res.status(404).send({
        status:     404,
        error:    'redflag not found'
    });
});

// server 
const PORT = 3000;
app.listen(PORT, () => {
    console.log('We are live on ' + PORT);
});

