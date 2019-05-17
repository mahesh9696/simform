import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";

const Appointments = {
  /**
   * Book A Appointment
   * @param {object} req 
   * @param {object} res
   * @returns {object} appointment object 
   */
  async book(req, res) {
    const createQuery = `INSERT INTO
      appointments(status, appointment_time, user_id, service_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      "booked",
      req.body.appointment_time,
      req.user.id,
      req.body.service_id,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get All Reflections
   * @param {object} req 
   * @param {object} res 
   * @returns {object} reflections array
   */
  async getAll(req, res) {
    const findAllQuery = "SELECT * FROM appointments where user_id = $1";
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  
  /**
   * Cancel Appointment
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated appointment
   */
  async cancel(req, res) {
    const findOneQuery =
      "SELECT * FROM appointments WHERE id=$1 AND user_id = $2";
    const updateOneQuery = `UPDATE appointments
      SET status=$1,modified_date=$2
      WHERE id=$3 AND user_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [
        req.params.id,
        req.user.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: "appointment not found" });
      }
      const values = [
        "canceled",
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default Appointments;
