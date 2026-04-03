import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/carsAPI'
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

const CreateCar = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [selections, setSelections] = useState({
    exterior_color: 'Red',
    wheels: 'Standard',
    interior: 'Cloth',
    trim: 'Base'
  })

  const totalPrice = calculatePrice(selections.wheels, selections.interior, selections.trim)

  const handleSelect = (feature, value) => {
    setSelections(prev => ({ ...prev, [feature]: value }))
    setError('')
  }

  const handleSubmit = async () => {
    // validation - luxury trim requires leather or suede interior
    if (selections.trim === 'Luxury' && selections.interior === 'Cloth') {
      setError('Luxury trim requires Leather or Suede interior!')
      return
    }

    const car = { ...selections, total_price: totalPrice }
    console.log('Submitting car:', car)
    const result = await createCar(car)
    console.log('Result:', result)
    navigate('/customcars')

  }

  return (
    <div className='create-car'>
      <h1>Build Your Car 🚗</h1>

      {/* Visual Car Preview */}
      <div className='car-preview' style={{ backgroundColor: CAR_COLORS[selections.exterior_color] }}>
        <p>🚗</p>
        <p>{selections.exterior_color} | {selections.trim}</p>
      </div>

      {/* Price Display */}
      <div className='price-display'>
        <h2>Total Price: ${totalPrice.toLocaleString()}</h2>
      </div>

      {error && <p className='error-message'>{error}</p>}

      {/* Exterior Color */}
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

      {/* Wheels */}
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

      {/* Interior */}
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

      {/* Trim */}
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

      <button className='submit-btn' onClick={handleSubmit}>
        Save My Car 🚗
      </button>
    </div>
  )
}

export default CreateCar