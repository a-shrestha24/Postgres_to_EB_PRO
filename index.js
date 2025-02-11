require("dotenv").config();

const{Client} = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // requests to EB PRO
app.use(express.json()); // json requests


const con = new Client({
    host:"10.1.10.122", // Database is hosted locally, change if hosted elsewhere
    user:"postgres", // PostgreSQL username
    port:5432,       // Default PostgreSQL port
    password: process.env.DB_PASSWORD,  // Password for Postgresql
    database:"machine_status" // Database name that is being used

})

con.connect().then(() => console.log("connected")) // Connect the client with the given credientals to the postgresql server



// on localhost:3000/data it will hold all the data gathered by the get request
app.get("/data", async(req, res) => {
    try{
         const result = await con.query('Select * from machine_status ORDER BY id ASC;'); // try and look in the database for all data
        //const result = await con.query('Select * from machine_status;');
        res.json(result.rows); // print the json of the gathered data
    }catch(err){
        res.status(500).json({error: err.message}); // error 
    }
});

app.get("/count", async(req,res) => {
    try{
        const count = await con.query('SELECT count(*) FROM machine_status;');
        res.json(count.rows);

    }catch(err){
        res.status(500).json({error:err.message}); // error in getting the count from the table
    }
})

const PORT = 3000; // port being used
const HOST = "10.1.10.122"; // Bind API to this IP
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
