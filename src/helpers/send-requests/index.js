import config from '@/config'
import dayjs from 'dayjs'

export async function apiFetch (url = '', payload = {}) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return res.json()
  } catch (e) {
    console.log('Ошибка загрузки данных о продуктах')
    throw e
  }
}

export async function sendOrder (payload) {
  const data = {
    token: payload.token,
    FIAS: payload.FIAS,
    KLADR: payload.KLADR || '',
    DATE_CREATE: dayjs().format('DD.MM.YY HH:mm:ss'),
    STATUS: 'new',
    NAME: payload.NAME,
    LAST_NAME: payload.LAST_NAME,
    MIDDLE_NAME: payload.MIDDLE_NAME,
    PHONE: '+7' + payload.PHONE,
    EMAIL: payload.EMAIL,
    DELIVERY_PRICE: payload.DELIVERY_PRICE,
    WEIGHT: payload.WEIGHT,
    PRICE: payload.PRICE,
    ADDRESS: payload.ADDRESS,
    PVZ_ADDRESS: payload.PVZ_ADDRESS || '',
    PAID: false,
    PAYMENT_TYPE: payload.PAYMENT_TYPE,
    PLACE_ID: payload.PLACE_ID,
    SEND_ORDER_TO_SDT: true,
    RU_POST_DELIVERY: payload.RU_POST_DELIVERY,
    COURIER_DELIVERY: payload.COURIER_DELIVERY,
    B2B_CLIENT: false,
    LOYALTY_POINT: 0,
    DELIVERY_INTERVAL: 0,
    COMMENT: '',
    PRODUCTS: payload.PRODUCTS
  }

  return await fetch(config.apiUrl + 'orders/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => { throw err })
}

export async function getAddressSuggestions (query, locationRestriction) {
  return await fetch(
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token 57cbf3a3f286362e0646fa685c4091b60a7eac9e'
      },
      body: JSON.stringify({
        query,
        locations: locationRestriction
      })
    })
    .then(res => res.json())
    .catch(err => { throw err })
}
