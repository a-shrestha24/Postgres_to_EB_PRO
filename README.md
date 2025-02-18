PostgreSQL to EasyBuilder Pro via Node.js API

Overview

This project demonstrates how to connect a PostgreSQL database to an EasyBuilder Pro project using a Node.js API. It allows you to request and display data on an HMI through a RESTful API.

Requirements

Node.js

PostgreSQL & PGAdmin

EasyBuilder Pro (Weintek HMI)

VSCode or a code editor of your choice

Project Structure

├── index.js                # Main API server
├── .env                    # Environment variables (database credentials)
└── README.md               # Project documentation

Installation

Clone the repository:

git clone https://github.com/yourusername/postgres-ebpro-node-api.git
cd postgres-ebpro-node-api

Install dependencies:

npm install

Create a .env file:

DB_PASSWORD=your_database_password

Initialize PostgreSQL database:

Create a database named machine_status

Add a table with fields: id, product, status, amount

Running the API

node index.js

The API will be available at http://localhost:3000

/data – Retrieves all records

/count – Retrieves the total number of records

Configuring EasyBuilder Pro

Add JavaScript objects: Use the provided request.js file in your project.

Configure Memory Addresses: Ensure they match your recipe table fields.

Set Up Commands: Use system registers for adding, updating, or deleting recipes.

Testing

Use Postman to test API endpoints.

Run EasyBuilder Pro offline simulation to verify data display.

Troubleshooting

Connection Issues: Ensure PostgreSQL is running and credentials are correct.

HMI Display Errors: Verify memory address configurations in EasyBuilder Pro.

Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License

This project is licensed under the MIT License.
