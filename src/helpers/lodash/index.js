import _ from 'lodash'

export default app => (app.config.globalProperties.$_ = _)
