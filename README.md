## **WeintekUSA PostgreSQL Integration for EasyBuilder Pro**
![image](https://github.com/user-attachments/assets/a0ac893c-fedb-4fd8-b11c-49332ee42e9b)

## **Overview**
This repository accompanies the WeintekUSA tutorial on integrating a PostgreSQL database with an EasyBuilder Pro project using a Node.js API. The included files facilitate seamless data retrieval and communication between the database and EasyBuilder Pro, ensuring efficient data transfer and synchronization.

## **Repository Contents**

### **API & Backend**
- **`index.js`** – The primary Node.js API setup file. This script defines the endpoints required to interact with the PostgreSQL database, enabling data retrieval and transfer.
- **`java_api_request.js`** – A JavaScript resource used within the JS Object in EasyBuilder Pro to make HTTP requests to the Node.js API.
  
### **EasyBuilder Pro Integration**
- **`eb_pro_postgres_api_recipe.js`** – JavaScript code to configure the JS Object in EasyBuilder Pro for handling data exchanges with the Node.js API. It ensures that the retrieved data is processed and assigned to a **Recipe Database** object.
- **`esb_code_api_requests_static.js`** – JavaScript code to configure the JS Object in EasyBuilder Pro for handling data exchanges with the Node.js API. It ensures that the retrieved data is processed and assigned to an **ASCII** object.

## Prerequisites

## Prerequisites

Before getting started, ensure you have the following installed and set up:

- **[Node.js](https://nodejs.org/en)** – Required to run the API.
- **[PostgreSQL](https://www.postgresql.org/download/)** – Ensure your database is installed and configured with the necessary schema.
- **[EasyBuilder Pro](https://www.weintek.com/globalw/Download/Download.aspx)** – Needed for project development and integration.

## Setting Up the Node.js Environment

To initialize a new Node.js project, run:

```sh
npm init -y
npm install express
npm install cors
npm install dotenv
```





---
This integration ensures a smooth and efficient connection between your PostgreSQL database and EasyBuilder Pro, enabling seamless data management and automation.
