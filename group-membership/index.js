const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');  
const axios = require('axios');
const moment = require('moment');

require('dotenv').config(); // Removes private keys from public code

const dbservice = require('./db_service');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



/*
I currently have a users table, a groups table, and a users/groups junction table. Each record in the 
junction table is one membership, AKA user 73 joined group 12. Only need three actions: write a new record
to the table, delete a record from the table, and read from the table 
*/



// Read all memberships
app.get('/groups/memberships', async (req, res) => {

  try {
    const results = await dbservice.promise().query(`SELECT * FROM dim_group_membership`)
    res.status(200).send(results[0])
  }
  catch (err) {
    console.log(err)
  }
});


// Read one specific membership by id (e.g., groups/membership/4)
app.get('/groups/membership/:id', async (req, res) => {

  const id_membership = req.params.id;  

// Need to validate inputs. Currently accepts anything. Use RequestValidationError from class?

  try {
    const results = await dbservice.promise().query("SELECT * FROM dim_group_membership WHERE id_membership = :id", {id: id_membership})
    res.status(200).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
});



// New membership
app.post('/groups/newmembership', async (req, res) => {

  const { id_user, id_group } = req.body;
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');


  // Need to validate inputs. Currently accepts anything. Use RequestValidationError from class? 

  try {
    const results = await dbservice.promise().query("INSERT INTO dim_group_membership (id_user, id_group, created_at) VALUES (:id_user,\
      :id_group, :mysqlTimestamp)", { id_user: id_user, id_group: id_group, mysqlTimestamp: mysqlTimestamp });
    res.status(201).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
 
});




// Remove membership
app.delete('/groups/membership/:id', async (req, res) => {

  const id_membership = req.params.id;  

  // Also able to delete with id_user and id_group instead of id_membership?


  // Need to validate inputs. Currently accepts anything. Use RequestValidationError from class? 

  try {
    const results = await dbservice.promise().query("DELETE FROM dim_group_membership\
      WHERE id_membership = :id_membership", { id_membership: id_membership });
    res.status(200).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
 
});



app.listen(4010, () => {
  console.log('Listening on 4010');
});