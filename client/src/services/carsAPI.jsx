const BASE_URL = ' '

export const getAllCars = async () => {
  const response = await fetch(`${BASE_URL}/cars`)
  const data = await response.json()
  return data
}

export const getCarById = async (id) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`)
  const data = await response.json()
  return data
}

export const createCar = async (car) => {
  const response = await fetch(`${BASE_URL}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
  const data = await response.json()
  return data
}

export const updateCar = async (id, car) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
  const data = await response.json()
  return data
}

export const deleteCar = async (id) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}