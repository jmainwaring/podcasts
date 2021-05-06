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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

  

/*
I currently have a users table, a groups table, and a users/groups junction table. Each record in the 
junction table is one membership, AKA user 73 joined group 12. Only need three actions: write a new record
to the table, delete a record from the table, and read from the table 
*/


// Read all memberships
app.get('/groups/memberships', async (req, res) => {

  try {
    const results = await dbservice.promise().query(`SELECT * FROM group_membership`)
    res.status(200).send(results[0])
  }
  catch (err) {
    console.log(err)
  }
});



// Read one specific membership by id (e.g., groups/membership/4)
app.get('/groups/membership/:id', async (req, res) => {

  // const new_membership_id = req.query.id;  
  const new_membership_id = req.params.id;  

// Need to validate inputs. Currently accepts anything. Use RequestValidationError from class?

  try {
    const results = await dbservice.promise().query("SELECT * FROM group_membership WHERE new_membership_id = :id", {id: new_membership_id})
    res.status(200).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
});




// New membership
app.post('/groups/newmembership', async (req, res) => {

  const { user_id, group_id } = req.body;
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');


  // Need to validate inputs. Currently accepts anything. Use RequestValidationError from class? 

  try {
    const results = await dbservice.promise().query("INSERT INTO group_membership (user_id, group_id, ts) VALUES (:user_id,\
      :group_id, :mysqlTimestamp)", { user_id: user_id, group_id: group_id, mysqlTimestamp: mysqlTimestamp });
    res.status(201).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
 
});




// Remove membership
app.delete('/groups/removemembership', async (req, res) => {

  const { new_membership_id } = req.body;

  // Also able to delete with user_id and group_id instead of new_membership_id?


  // Need to validate inputs. Currently accepts anything. Use RequestValidationError from class? 

  try {
    const results = await dbservice.promise().query("DELETE FROM group_membership\
      WHERE new_membership_id = :new_membership_id", { new_membership_id: new_membership_id });
    res.status(200).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
 
});



app.listen(4010, () => {
  console.log('Listening on 4010');
});
  