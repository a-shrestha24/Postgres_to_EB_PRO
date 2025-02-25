WeintekUSA PostgreSQL Integration for EasyBuilder Pro

Overview

This repository accompanies the WeintekUSA tutorial on integrating a PostgreSQL database with an EasyBuilder Pro project using a Node.js API. The included files facilitate seamless data retrieval and communication between the database and EasyBuilder Pro, ensuring efficient data transfer and synchronization.

Repository Contents

API & Backend

index.js – The primary Node.js API setup file. This script defines the endpoints required to interact with the PostgreSQL database, enabling data retrieval and transfer.

java_api_request.js – A JavaScript resource used within the JS Object in EasyBuilder Pro to make HTTP requests to the Node.js API.

EasyBuilder Pro Integration

eb_pro_postgres_api_recipe.js – JavaScript code to configure the JS Object in EasyBuilder Pro for handling data exchanges with the Node.js API. It ensures that the retrieved data is processed and assigned correctly within EasyBuilder Pro.

esb_code_api_requests_static.js – A static JavaScript file designed to set up and manage API requests within EasyBuilder Pro. This file facilitates data transfer to appropriate recipe databases and ASCII objects within the project.

Installation & Usage

Prerequisites

Node.js installed on your system

PostgreSQL database setup with the required schema

EasyBuilder Pro software installed
![image](https://github.com/user-attachments/assets/a0ac893c-fedb-4fd8-b11c-49332ee42e9b)

