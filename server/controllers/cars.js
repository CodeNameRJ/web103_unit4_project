import { pool } from '../config/database.js'

const getCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM custom_cars ORDER BY created_at DESC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getCarById = async (req, res) => {
  try {
    const { id } = req.params
    const results = await pool.query('SELECT * FROM custom_cars WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const createCar = async (req, res) => {
  try {
    const { exterior_color, wheels, interior, trim, total_price } = req.body
    const results = await pool.query(
      'INSERT INTO custom_cars (exterior_color, wheels, interior, trim, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [exterior_color, wheels, interior, trim, total_price]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const updateCar = async (req, res) => {
  try {
    const { id } = req.params
    const { exterior_color, wheels, interior, trim, total_price } = req.body
    const results = await pool.query(
      'UPDATE custom_cars SET exterior_color = $1, wheels = $2, interior = $3, trim = $4, total_price = $5 WHERE id = $6 RETURNING *',
      [exterior_color, wheels, interior, trim, total_price, id]
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM custom_cars WHERE id = $1', [id])
    res.status(200).json({ message: `Car ${id} deleted successfully` })
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default { getCars, getCarById, createCar, updateCar, deleteCar }