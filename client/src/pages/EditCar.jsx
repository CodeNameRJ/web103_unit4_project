import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCarById, updateCar } from '../services/carsAPI'
import { calculatePrice } from '../utilities/calcPrice'
import '../App.css'

const COLOR_OPTIONS = ['Red', 'Blue', 'Black', 'White', 'Silver']
const WHEEL_OPTIONS = ['Standard', 'Sport', 'Chrome', 'Off-Road']
const INTERIOR_OPTIONS = ['Cloth', 'Leather', 'Suede']
const TRIM_OPTIONS = ['Base', 'Sport', 'Premium', 'Luxury']

const CAR_COLORS = {
  Red: '#e74c3c',
  Blue: '#3498db',
  Black: '#2c3e50',
  White: '#ecf0f1',
  Silver: '#95a5a6'
}

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [selections, setSelections] = useState({
    exterior_color: 'Red',
    wheels: 'Standard',
    interior: 'Cloth',
    trim: 'Base'
  })

  useEffect(() => {
    const fetchCar = async () => {
      const data = await getCarById(id)
      setSelections({
        exterior_color: data.exterior_color,
        wheels: data.wheels,
        interior: data.interior,
        trim: data.trim
      })
    }
    fetchCar()
  }, [id])

  const totalPrice = calculatePrice(selections.wheels, selections.interior, selections.trim)

  const handleSelect = (feature, value) => {
    setSelections(prev => ({ ...prev, [feature]: value }))
    setError('')
  }

  const handleUpdate = async () => {
    if (selections.trim === 'Luxury' && selections.interior === 'Cloth') {
      setError('Luxury trim requires Leather or Suede interior!')
      return
    }

    const car = { ...selections, total_price: totalPrice }
    await updateCar(id, car)
    navigate('/customcars')
  }

  return (
    <div className='edit-car'>
      <h1>Edit Your Car 🚗</h1>

      <div className='car-preview' style={{ backgroundColor: CAR_COLORS[selections.exterior_color] }}>
        <p>🚗</p>
        <p>{selections.exterior_color} | {selections.trim}</p>
      </div>

      <div className='price-display'>
        <h2>Total Price: ${totalPrice.toLocaleString()}</h2>
      </div>

      {error && <p className='error-message'>{error}</p>}

      <div className='feature-section'>
        <h3>Exterior Color</h3>
        <div className='options-row'>
          {COLOR_OPTIONS.map(color => (
            <button
              key={color}
              className={selections.exterior_color === color ? 'option-btn selected' : 'option-btn'}
              style={{ backgroundColor: CAR_COLORS[color] }}
              onClick={() => handleSelect('exterior_color', color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className='feature-section'>
        <h3>Wheels</h3>
        <div className='options-row'>
          {WHEEL_OPTIONS.map(wheel => (
            <button
              key={wheel}
              className={selections.wheels === wheel ? 'option-btn selected' : 'option-btn'}
              onClick={() => handleSelect('wheels', wheel)}
            >
              {wheel}
            </button>
          ))}
        </div>
      </div>

      <div className='feature-section'>
        <h3>Interior</h3>
        <div className='options-row'>
          {INTERIOR_OPTIONS.map(interior => (
            <button
              key={interior}
              className={selections.interior === interior ? 'option-btn selected' : 'option-btn'}
              onClick={() => handleSelect('interior', interior)}
            >
              {interior}
            </button>
          ))}
        </div>
      </div>

      <div className='feature-section'>
        <h3>Trim</h3>
        <div className='options-row'>
          {TRIM_OPTIONS.map(trim => (
            <button
              key={trim}
              className={selections.trim === trim ? 'option-btn selected' : 'option-btn'}
              onClick={() => handleSelect('trim', trim)}
            >
              {trim}
            </button>
          ))}
        </div>
      </div>

      <button className='submit-btn' onClick={handleUpdate}>
        Update My Car 🚗
      </button>
    </div>
  )
}

export default EditCar