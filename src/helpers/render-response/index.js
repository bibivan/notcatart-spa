import _ from 'lodash'

const renderAttributes = item => {
  try {
    const parsedAttributes = {}
    JSON.parse(item.ATTRIBUTES).sfAttrs
      .forEach(attr => {
        parsedAttributes[attr.name] = attr.value
      })
    item.ATTRIBUTES = parsedAttributes
  } catch {
    console.log('Ошибка при парсинге атрибутов товара')
    item.ATTRIBUTES = {
      type: 'Нет информации',
      texture: 'Нет информации'
    }
  }
}

const renderPictures = item => {
  try {
    item.PICTURES = JSON.parse(item.PICTURES).sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  } catch {
    console.log('Ошибка при парсинге изображений')
    item.PICTURES = []
  }
}

const renderSize = item => {
  try {
    item.SIZE = JSON.parse(item.SIZE)
  } catch {
    console.log('Ошибка при парсинге размеров, устновлены мок-данные')
    item.SIZE = [10, 10, 10]
  }
}

const renderPrice = item => {
  item.PRICE = item.PRICE.replaceAll('"', '')
}

export default function (data) {
  const products = _.values(data)
  products.forEach(item => {
    renderAttributes(item)
    renderPictures(item)
    renderPrice(item)
    renderSize(item)
  })
  return products
}
