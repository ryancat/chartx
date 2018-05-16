import xAxisRenderReducer from './xAxisRenderReducer'
import yAxisRenderReducer from './yAxisRenderReducer'
import legendRenderReducer from './legendRenderReducer'
import chartRenderReducer from './chartRenderReducer'
// import sceneReducer from './sceneReducer'

export default {
  // scene: sceneReducer,
  xAxis: xAxisRenderReducer,
  yAxis: yAxisRenderReducer,
  chart: chartRenderReducer,
  legend: legendRenderReducer
}