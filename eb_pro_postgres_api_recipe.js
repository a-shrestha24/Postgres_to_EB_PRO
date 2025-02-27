const request = require('/java_api_requests.js'); // JS request module for EB Pro

var self = this; // Access objects set up in the Objects tab
var count = 0;   // Number of indexes pulled from the database

var mouseArea = new MouseArea(); // Mouse area to activate JS object on click
this.widget.add(mouseArea);      // Adding the mouseArea object to the JS object

// Set the new host IP address
const API_HOST = 'http://192.168.4.37:3000';  // New host address

// on click the mouseArea object will run the following commands
mouseArea.on('click', async (mouseEvent) => {
    try {
        // Clear the existing table
        var clean_cmd = 4;
        driver.setData(self.config.COMMAND, clean_cmd);
        console.log("Fetching data from API...");

        // Fetch count and data from the API
        await get_count(); 
        await get_data();  

    } catch (err) {
        console.log('Error retrieving data (mouseArea):', err.message);
    }
});

// Data is retrieved from the API at the /data endpoint
async function get_data() {
    try {
        request.get({
           url: `${API_HOST}/data`, // New host address for data endpoint
        }, updateFields); 
    } catch (err) {
        console.log('Error fetching data(Get Data):', err.message);
    }
}

// Number of indexes is retrieved from the /count endpoint
async function get_count() {
    try {
        request.get({
           url: `${API_HOST}/count`, // New host address for count endpoint
        }, updateCount);
    } catch (err) {
        console.log('Error fetching data(Get Count):', err.message);
    }
}

// Callback function to update the count
function updateCount(error, response, body) {
    try {
        const data = JSON.parse(body);
        if (data.length === 0) {
            console.log("Count not received.");
            return;
        }
        count = Number(data[0].count); 
        console.log(`Count received: ${count}`);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

// Callback function to place the values from the database into the recipe database
// call back function to place the values from the database into the recipe database
function updateFields(error, response, body) {
    try {
        

        const data = JSON.parse(body); // grab the data from the /data endpoint

        // error handler if no data is recived. 
        if (data.length === 0) {
            console.log("No data received from database.");
            return;
        }


        // for loop to run through all values in the database. 
        for (let i = 0; i < count; i++) {

            // placing all values from each index into variables. 
            var id1 = data[i].id.toString()// since setStringData is used, all values are turned into strings. use set data if non string values are needed
            var product1 = data[i].product
            var status1 = data[i].status
            var amount1 = data[i].amount.toString()
            

            // Placing the values from the API into their coresponding rows. 
            driver.setStringData(self.config.ID, 5, id1);
            driver.setStringData(self.config.PRODUCT, 20, product1);
            driver.setStringData(self.config.STATUS, 20, status1);
            driver.setStringData(self.config.AMOUNT, 5, amount1);
         
            setTimeout(wait, 5000); // a tempory timeout is set to allow of placing of values into coressponding memory address
            var set_cmd = 1; // Within the recipe database the '1' allows for the inserting of data
            driver.setData(self.config.COMMAND, set_cmd); // setting the data in the rows to the recipe database 
            
          }
        
        
        console.log("HMI updated successfully with API data."); // Feedback of sucessful transfer


    } catch (error) {

        // printing of error if found. 
        console.log("Error processing API response (updateFields):", error.message);
    }
}
// Placeholder function for the timeout
function wait() {
    console.log("waiting");
}
