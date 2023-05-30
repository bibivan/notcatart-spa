/**
 * узнать ширину скроллбара
 */
export function getScrollBarWidth () {
  const outer = document.createElement('div')

  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  outer.style.width = '50px'
  outer.style.height = '50px'
  outer.style.overflow = 'scroll'
  outer.style.visibility = 'hidden'

  document.body.append(outer)
  const scrollBarWidth = outer.offsetWidth - outer.clientWidth
  outer.remove()

  return scrollBarWidth
}

/**
 * показать скроллбар
 */
export function showScroll () {
  const header = document.querySelector('header')
  document.body.style.paddingRight = ''
  document.body.style.overflow = 'visible'
  header.style.paddingRight = ''
  header.style.overflow = 'visible'
}

/**
 * скрыть скроллбар
 */
export function hideScroll () {
  const header = document.querySelector('header')
  document.body.style.paddingRight = getScrollBarWidth() + 'px'
  document.body.style.overflow = 'hidden'
  header.style.paddingRight = getScrollBarWidth() + 'px'
  header.style.overflow = 'hidden'
}
