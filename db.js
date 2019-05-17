// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        user_name VARCHAR(128) UNIQUE NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Create Services Table
 */
const createServicesTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      services(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Sample Services Data
 */
const createServicesData = () => {
  const queryText =
    `INSERT INTO
      services(name,created_date,modified_date)
      VALUES('first','2019-05-17 05:04:13.3','2019-05-17 05:04:13.3'),
      ('second','2019-05-17 05:04:13.3','2019-05-17 05:04:13.3'),
      ('third','2019-05-17 05:04:13.3','2019-05-17 05:04:13.3')
      returning *`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Create Appointments Table
 */  
const createAppointmentsTable = () => {
  
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      appointments(
        id SERIAL PRIMARY KEY,
        status VARCHAR(128),
        appointment_time VARCHAR(128),
        user_id UUID NOT NULL,
        service_id INTEGER NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Service Table
 */
const dropServiceTable = () => {
  const queryText = 'DROP TABLE IF EXISTS services';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Appointment Table
 */
const dropAppointmentTable = () => {
  const queryText = 'DROP TABLE IF EXISTS appointments';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createServicesTable();
  createServicesData();
  createAppointmentsTable();
}
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropServiceTable();
  dropAppointmentTable();
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUserTable,
  createServicesTable,
  createServicesData,
  createAppointmentsTable,
  createAllTables,
  dropUserTable,
  dropServiceTable,
  dropAppointmentTable,
  dropAllTables
};

require('make-runnable');