import _ from 'lodash'

const renderAttributes = item => {
  const parsedAttributes = {}
  JSON.parse(item.ATTRIBUTES).sfAttrs
    .forEach(attr => {
      parsedAttributes[attr.name] = attr.value
    })
  item.ATTRIBUTES = parsedAttributes
}

const renderPictures = item => {
  item.PICTURES = JSON.parse(item.PICTURES).sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}

const renderSize = item => {
  item.SIZE = JSON.parse(item.SIZE)
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
