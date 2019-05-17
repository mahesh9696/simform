// server.js
import express from "express";
import dotenv from "dotenv";
import cors  from 'cors';
import UserWithDb from "./src/controllers/User";
import ServicesWithDb from "./src/controllers/Services";
import AppontmentmentsWithDb from "./src/controllers/Appointments";
import Auth from "./src/middleware/Auth";
import bodyParser from "body-parser";
import logger from "./src/logger";

dotenv.config();

const app = express();

app.use(express.json());

// Enabled cores
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Endpoint is working" });
});

app.post("/api/v1/users", UserWithDb.create);
app.post("/api/v1/users/login", UserWithDb.login);
// app.delete("/api/v1/users/me", Auth.verifyToken, UserWithDb.delete);
app.get("/api/v1/services", Auth.verifyToken, ServicesWithDb.getAll);
app.post(
  "/api/v1/appointments/book",
  Auth.verifyToken,
  AppontmentmentsWithDb.book
);
app.get("/api/v1/appointments", Auth.verifyToken, AppontmentmentsWithDb.getAll);
app.put(
  "/api/v1/appointments/cancel/:id",
  Auth.verifyToken,
  AppontmentmentsWithDb.cancel
);

app.listen(3000);
logger.info('app running on port')
console.log("app running on port ", 3000);
