require("dotenv").config(); // used to protect passwords


const{Client} = require('pg');
const express = require('express');
const cors = require('cors');

const app = express(); // express for creating a web server to retrieve data
app.use(cors()); // requests to EB PRO
app.use(express.json()); // json requests


const con = new Client({
    host:process.env.IP_ADDRESS, // Database is hosted locally, change if hosted elsewhere
    user:"postgres", // PostgreSQL username
    port:5432,       // Default PostgreSQL port
    password: process.env.DB_PASSWORD, 

    database:"machine_status" // Database name that is being used

})

con.connect().then(() => console.log("connected")) // Connect the client with the given credientals to the postgresql server



// on localhost:3000/data it will hold all the data gathered by the get request
app.get("/data", async(req, res) => {
    try{
         const result = await con.query('Select * from machine_status ORDER BY id ASC;'); // try and look in the database for all data
      
        res.json(result.rows); // print the json of the gathered data
    }catch(err){
        res.status(500).json({error: err.message}); // error 
    }
});

// Will need to get the amount of indexes within the database when displaying the data
app.get("/count", async(req,res) => {
    try{
        const count = await con.query('SELECT count(*) FROM machine_status;'); // Will the count of indexes in the machine_status table
        res.json(count.rows); // display the count
        

    }catch(err){
        res.status(500).json({error:err.message}); // error in getting the count from the table
    }
})

const PORT = 3000; // port being used
const HOST = "192.168.4.37"; // Bind API to this IP to host on router. Will allow the HMI to access the data

//Start hosting the API
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`); // homepage of the api printed out
});



///

// # Need to create a enivorment for NODE. Will give you all the json packages needed
//npm init -y


// # Express - Web server framework
// npm install express

// # pg - PostgreSQL client for Node.js
// npm install pg

// # cors - Middleware to handle cross-origin requests
// npm install cors

// # dotenv - To manage environment variables (like your database password)
// npm install dotenv



///