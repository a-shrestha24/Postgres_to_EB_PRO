const request = require('/java_api_requests.js');

var self = this;

var mouseArea = new MouseArea();
this.widget.add(mouseArea);  

mouseArea.on('click', async (mouseEvent) => {
    try {
        console.log("Fetching data from API...");
        await get_data();  
    } catch (err) {
        console.log('Error retrieving data (mouseArea):', err.message);
    }
});

async function get_data() {
    try {
        request.get({ 
            url: 'http://10.1.10.122:3000/data', // API URL
        }, updateFields); // could possibly not use a call back function and rather use a promise. 
    } catch (err) {
        console.log('Error fetching data(Get Data):', err.message);
    }
}


function updateFields(error, response, body) {
    try {
        

        const data = JSON.parse(body); 
        if (data.length === 0) {
            console.log("No data received from database.");
            return;
        }
        
        
        var id1 = data[0].id.toString()
        var id2 = data[1].id.toString()
        var id3 = data[2].id.toString()
        var id4 = data[3].id.toString()
        var id5 = data[4].id.toString()

        var product1 = data[0].product
        var product2 = data[1].product
        var product3 = data[2].product
        var product4 = data[3].product
        var product5 = data[4].product

        var status1 = data[0].status
        var status2 = data[1].status
        var status3 = data[2].status
        var status4 = data[3].status
        var status5 = data[4].status

        var amount1 = data[0].amount.toString()
        var amount2 = data[1].amount.toString()
        var amount3 = data[2].amount.toString()
        var amount4 = data[3].amount.toString()
        var amount5 = data[4].amount.toString()

     
        driver.setStringData(self.config.ID1, 5, id1);
        driver.setStringData(self.config.ID2, 5, id2);
        driver.setStringData(self.config.ID3, 5, id3);
        driver.setStringData(self.config.ID4, 5, id4);
        driver.setStringData(self.config.ID5, 5, id5);

        driver.setStringData(self.config.PRODUCT1, 20, product1);
        driver.setStringData(self.config.PRODUCT2, 20, product2);
        driver.setStringData(self.config.PRODUCT3, 20, product3);
        driver.setStringData(self.config.PRODUCT4, 20, product4);
        driver.setStringData(self.config.PRODUCT5, 20, product5);

        driver.setStringData(self.config.STATUS1, 20, status1);
        driver.setStringData(self.config.STATUS2, 20, status2);
        driver.setStringData(self.config.STATUS3, 20, status3);
        driver.setStringData(self.config.STATUS4, 20, status4);
        driver.setStringData(self.config.STATUS5, 20, status5);


        driver.setStringData(self.config.AMOUNT1, 5, amount1);
        driver.setStringData(self.config.AMOUNT2, 5, amount2);
        driver.setStringData(self.config.AMOUNT3, 5, amount3);
        driver.setStringData(self.config.AMOUNT4, 5, amount4);
        driver.setStringData(self.config.AMOUNT5, 5, amount5);

        console.log("HMI updated successfully with API data.");
    } catch (error) {
        console.log("Error processing API response (updateFields):", error.message);
    }
}
