import xAxisReducer from './xAxisReducer'
import yAxisReducer from './yAxisReducer'
import detailReducer from './detailReducer'
import legendReducer from './legendReducer'
import chartReducer from './chartReducer'
// import sceneReducer from './sceneReducer'

export default {
  // scene: sceneReducer,
  xAxis: xAxisReducer,
  yAxis: yAxisReducer,
  detail: detailReducer,
  chart: chartReducer,
  legend: legendReducer
}