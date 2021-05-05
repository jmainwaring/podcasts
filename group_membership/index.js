const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');  
const axios = require('axios');

require('dotenv').config(); // Removes private keys from public code

const dbservice = require('./db_service');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
  

/*
I currently have a users table, a groups table, and a users/groups junction 
table. Each record in the junction table is one membership, AKA user 73 
joined group 12. Only need three actions: write a new record to the table, 
delete a record from the table, and read from the table 
*/


// Read all memberships
app.get('/groups/memberships', async (req, res) => {

  try {
    const results = await dbservice.promise().query(`SELECT * FROM group_membership`)
    res.status(201).send(results[0])
  }
  catch (err) {
    console.log(err)
  }
});




// Read one specific membership by id
app.get('/groups/membership/:id', async (req, res) => {

  // const new_membership_id = req.query.id;  
  const new_membership_id = req.params.id;  
  console.log(new_membership_id)


// To-do: refactor prevent sql injections


// Need to validate inputs 
  try {
    const results = await dbservice.promise().query(`SELECT * FROM group_membership WHERE new_membership_id = ${new_membership_id}`)
    res.status(201).send(results[0])
  }
  catch (err) { 
    console.log(err)
  }
});





// New membership
app.post('/groups/newmembership', async (req, res) => {

});







// Delete







app.listen(4010, () => {
  console.log('Listening on 4010');
});
  