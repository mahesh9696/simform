# Saloon Booking System


Node base Saloon Booking System

## Prerequisites
What things you need to install the software and how to install them

```
Node JS
PostgreSQL
```

### ENV Variables
```
DATABASE_URL=postgres://root:root@127.0.0.1:5432/saloon_db
SECRET=simform
```

### Run below commands

npm install

#### For Create tables and seed data
```
node db createUserTable
node db createServicesTable
node db createServicesData
node db createAppointmentsTable
```


#### For Drop tables
```
node db dropAppointmentTable
node db dropUserTable
node db dropServiceTable

```

npm start

[Download Postman APIs Collection](https://raw.githubusercontent.com/mahesh9696/simform/master/saloon.postman_collection.json)
