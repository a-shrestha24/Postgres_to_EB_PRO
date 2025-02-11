const request = require('/java_api_requests.js');

var self = this;
var count = 0;

var mouseArea = new MouseArea();
this.widget.add(mouseArea);  

mouseArea.on('click', async (mouseEvent) => {
    try {
        var clear_cmd = 4
        driver.setData(self.config.COMMAND, clear_cmd);
        setTimeout(wait_and_clear, 5000);

        console.log("Fetching data from API...");
        await get_count(); 
        await get_data();  
    } catch (err) {
        console.log('Error retrieving data (mouseArea):', err.message);
    }
});

async function get_data() {
    try {
        request.get({
           url: 'http://10.1.10.122:3000/data',
        }, updateFields);
    } catch (err) {
        console.log('Error fetching data(Get Data):', err.message);
    }
}

async function get_count(){
    try {
        request.get({
           url: 'http://10.1.10.122:3000/count',
        }, updateCount);
    } catch (err) {
        console.log('Error fetching data(Get Data):', err.message);
    }
}

function updateCount(error, response, body){
    try {
        const data = JSON.parse(body); 
        if (data.length === 0) {
            console.log("Count not recived.");
            return;
        }
        console.log(count);
        count = data[0].count;
        console.log(count);

        
    } catch (error) {
        console.log('Error:', err.message);
    }
}

function updateFields(error, response, body) {
    try {
        

        const data = JSON.parse(body); 
        if (data.length === 0) {
            console.log("No data received from database.");
            return;
        }

        for (let i = 0; i < count; i++) {
            var id1 = data[i].id.toString()
            var product1 = data[i].product
            var status1 = data[i].status
            var amount1 = data[i].amount.toString()
            
            driver.setStringData(self.config.ID, 5, id1);
            driver.setStringData(self.config.PRODUCT, 20, product1);
            driver.setStringData(self.config.STATUS, 20, status1);
            driver.setStringData(self.config.AMOUNT, 5, amount1);
            
            console.log(id1)
            console.log(product1)
            console.log(status1)
            console.log(amount1)
            
        
            setTimeout(wait_and_clear, 5000);
            var set_cmd = 1;
            driver.setData(self.config.COMMAND, set_cmd);
          }
        
        
        
        
        console.log("HMI updated successfully with API data.");
    } catch (error) {
        console.log("Error processing API response (updateFields):", error.message);
    }
}

function wait_and_clear() {
    console.log("waiting")
}


