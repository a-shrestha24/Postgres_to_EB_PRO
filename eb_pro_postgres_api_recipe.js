const request = require('/java_api_requests.js'); // need to make js request. Files are installed within JS object resources

var self = this; // constructor to access objects set up in the Objects tab
var count = 0;   // count of how many indexes pulled from database

var mouseArea = new MouseArea(); //Mouse area set up so when clicked on JS object will activate
this.widget.add(mouseArea);      // Adding the mouseArea object to the JS object

// on click the mouseArea object will run the following commands
mouseArea.on('click', async (mouseEvent) => {
    try {

        // Clear the existing table. 
        // In the recipe index the 4 command will clear the recipe database and delete all existing data
        var clean_cmd = 4;
        driver.setData(self.config.COMMAND, clean_cmd); // Command of 4 is sent to the recipe database object

        // Get the count of table, and data from the table
        console.log("Fetching data from API...");
        await get_count(); // function is called to fetech the number of indexes from the database. 
        await get_data();  // function is called to fetech the data from the database


    } catch (err) {
        // If error is made the message will be printed
        console.log('Error retrieving data (mouseArea):', err.message);
    }
});


// Data is retrived from the API at the data end point
async function get_data() {
    try {

        // data is requested at the data endpoint
        request.get({
           url: 'http://10.1.10.122:3000/data',
        }, updateFields); // callback function is called after retriving the data from the end point. 

    } catch (err) {

        // Errors will be printed if found. 
        console.log('Error fetching data(Get Data):', err.message);
    }
}

// Number of indexes is retrived from the count endpoint. 
async function get_count(){
    try {
        request.get({
            // request to the count end point
           url: 'http://10.1.10.122:3000/count',
        }, updateCount); // call back function to update the count variable which is a global variable. 
    } catch (err) {

        // Error are printed if found
        console.log('Error fetching data(Get Data):', err.message);
    }
}

// call back function to update the count 
function updateCount(error, response, body){
    try {
        const data = JSON.parse(body);  // grabing the data from the API pull

        // error catcher if no data is recived. 
        if (data.length === 0) {
            console.log("Count not recived.");
            return;
        }
      
        count = data[0].count; // setting the count with the value from the database query. 


        
    } catch (error) {

        // errors printed if found. 
        console.log('Error:', err.message);
    }
}

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

// placedholder function for the timeout. 
function wait() {
    console.log("waiting")
}


