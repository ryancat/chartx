import xAxisReducer from './xAxisReducer'
import yAxisReducer from './yAxisReducer'
import legendReducer from './legendReducer'
import chartReducer from './chartReducer'
import sceneReducer from './sceneReducer'

export default {
  scene: sceneReducer,
  xAxis: xAxisReducer,
  yAxis: yAxisReducer,
  chart: chartReducer,
  legend: legendReducer
}