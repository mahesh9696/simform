import db from '../db';

const Services = {
  
  /**
   * Get All Services
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Services array
   */
 async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM services';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
}

export default Services;