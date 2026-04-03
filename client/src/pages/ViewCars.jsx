import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/carsAPI'
import '../App.css'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getAllCars()
      setCars(data)
    }
    fetchCars()
  }, [])

  const handleDelete = async (id) => {
    await deleteCar(id)
    setCars(cars.filter(car => car.id !== id))
  }

  return (
    <div className='view-cars'>
      <h1>Custom Cars 🚗</h1>
      <div className='cars-grid'>
        {cars.length > 0 ? (
          cars.map(car => (
            <div key={car.id} className='car-card'>
              <h3>{car.exterior_color} {car.trim}</h3>
              <p>🔧 Wheels: {car.wheels}</p>
              <p>🪑 Interior: {car.interior}</p>
              <p>💰 Price: ${car.total_price.toLocaleString()}</p>
              <div className='card-buttons'>
                <button onClick={() => navigate(`/customcars/${car.id}`)}>View</button>
                <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No custom cars yet. Build one!</p>
        )}
      </div>
    </div>
  )
}

export default ViewCars