import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCarById, deleteCar } from '../services/carsAPI'
import '../App.css'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)

  useEffect(() => {
    const fetchCar = async () => {
      const data = await getCarById(id)
      setCar(data)
    }
    fetchCar()
  }, [id])

  const handleDelete = async () => {
    await deleteCar(id)
    navigate('/customcars')
  }

  if (!car) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>

  return (
    <div className='car-details'>
      <h1>🚗 {car.exterior_color} {car.trim}</h1>
      <div className='details-card'>
        <p>🎨 Exterior Color: {car.exterior_color}</p>
        <p>🔧 Wheels: {car.wheels}</p>
        <p>🪑 Interior: {car.interior}</p>
        <p>⭐ Trim: {car.trim}</p>
        <p>💰 Total Price: ${car.total_price.toLocaleString()}</p>
        <p>📅 Created: {new Date(car.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className='details-buttons'>
        <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default CarDetails