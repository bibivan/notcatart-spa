const helpers = {
  formatPrice: number => new Intl.NumberFormat().format(+number)
}

const install = app => {
  app.config.globalProperties.$h = helpers
}

export { install as default, helpers as helper }
