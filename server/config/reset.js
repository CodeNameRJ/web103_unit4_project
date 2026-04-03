import { pool } from './database.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const createCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS custom_cars;

    CREATE TABLE IF NOT EXISTS custom_cars (
      id SERIAL PRIMARY KEY,
      exterior_color VARCHAR(50) NOT NULL,
      wheels VARCHAR(50) NOT NULL,
      interior VARCHAR(50) NOT NULL,
      trim VARCHAR(50) NOT NULL,
      total_price INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  try {
    await pool.query(createTableQuery)
    console.log(' custom_cars table created successfully')
  } catch (err) {
    console.error(' error creating custom_cars table', err)
  }
}

const seedCarsTable = async () => {
  await createCarsTable()

  const sampleCars = [
    { exterior_color: 'Red', wheels: 'Sport', interior: 'Leather', trim: 'Premium', total_price: 38500 },
    { exterior_color: 'Black', wheels: 'Chrome', interior: 'Suede', trim: 'Luxury', total_price: 44000 },
    { exterior_color: 'Blue', wheels: 'Standard', interior: 'Cloth', trim: 'Base', total_price: 30000 },
  ]

  sampleCars.forEach((car) => {
    const insertQuery = {
      text: 'INSERT INTO custom_cars (exterior_color, wheels, interior, trim, total_price) VALUES ($1, $2, $3, $4, $5)'
    }
    const values = [car.exterior_color, car.wheels, car.interior, car.trim, car.total_price]

    pool.query(insertQuery, values, (err) => {
      if (err) {
        console.error(' error inserting car', err)
        return
      }
      console.log(`${car.exterior_color} ${car.trim} car added successfully`)
    })
  })
}

seedCarsTable()