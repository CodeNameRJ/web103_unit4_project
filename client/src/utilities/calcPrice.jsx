const BASE_PRICE = 30000

const PRICE_OPTIONS = {
  wheels: {
    Standard: 0,
    Sport: 2000,
    Chrome: 3500,
    'Off-Road': 1500
  },
  interior: {
    Cloth: 0,
    Leather: 1500,
    Suede: 2500
  },
  trim: {
    Base: 0,
    Sport: 2000,
    Premium: 4000,
    Luxury: 7000
  }
}

export const calculatePrice = (wheels, interior, trim) => {
  return (
    BASE_PRICE +
    (PRICE_OPTIONS.wheels[wheels] || 0) +
    (PRICE_OPTIONS.interior[interior] || 0) +
    (PRICE_OPTIONS.trim[trim] || 0)
  )
}

export const getPriceOptions = () => PRICE_OPTIONS
export const getBasePrice = () => BASE_PRICE