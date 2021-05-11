const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');  
const axios = require('axios');
const moment = require('moment');

require('dotenv').config(); // Removes private keys from public code

const dbservice = require('./db_service');
const getTimestamp = require('../common/getTimestamp');
const generateUpdate = require('../common/generateUpdate');

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


// Read all groups
app.get('/groups/allgroups', async (req, res) => {

  try {
    const results = await dbservice.promise().query("SELECT * FROM podcast_groups")
    res.status(200).send(results[0])
  }
  catch (err) {
    console.log(err)
  }
});



// Read one specific membership by id (e.g., groups/membership/4)
app.get('/groups/:id', async (req, res) => {

  const id_group = req.params.id;  

// Need to validate inputs. Currently accepts anything. Use RequestValidationError from class?

  try {
    const results = await dbservice.promise().query("SELECT * FROM podcast_groups WHERE id_group = :id", {id: id_group})
    res.status(200).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
});




// New group
app.post('/groups/', async (req, res) => {

  // Leave id blank since it is auto-increment?
  // const id_group = req.params.id;  
  const { group_name, group_description, id_user, created_at } = req.body;
  var timestamp = getTimestamp.mysqlTimestamp();

  // Need to validate inputs. Currently accepts anything. Use RequestValidationError from class? 

  try {
    const results = await dbservice.promise().query("INSERT INTO podcast_groups (group_name, group_description, id_user,\
      created_at) VALUES (:group_name, :group_description, :id_user, :timestamp)", 
      { group_name: group_name, group_description: group_description, id_user: id_user, timestamp: timestamp });
    res.status(201).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
 
});




// Remove group
app.delete('/groups/:id', async (req, res) => {

  const id_group = req.params.id;

  // Need to validate inputs. Currently accepts anything. Use RequestValidationError from class? 

  try {
    const results = await dbservice.promise().query("DELETE FROM podcast_groups\
      WHERE id_group = :id_group", { id_group: id_group });
    res.status(200).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
 
});




// Modify group
app.put('/groups/', async (req, res) => {

  // Do I need to be consistent between snake_case and camelCase?
  const tableName = "podcast_groups";
  const { valuesAndCondition } = req.body;

  // Generating the full SQL UPDATE query
  const [rawSql, sqlParameters] = generateUpdate.generateUpdateStatement(tableName, valuesAndCondition)


// Need to validate inputs. Currently accepts anything. Use RequestValidationError from class? 

  try {
    const results = await dbservice.promise().query(rawSql, sqlParameters);
    res.status(200).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
 
});



app.listen(4011, () => {
  console.log('Listening on 4011');
});