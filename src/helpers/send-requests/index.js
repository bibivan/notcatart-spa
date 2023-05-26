export async function apiFetch (url = '', payload = {}) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return res.json()
  } catch (e) {
    console.log('Ошибка загрузки данных')
    return {
      success: false,
      comment: 'Ошибка загрузки данных'
    }
  }
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
