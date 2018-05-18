// TODO: this is to prevent regenerator-runtime not exist issue
// I feel this should be fixed in babel internally eventually
import 'regenerator-runtime/runtime'
import uuidv1 from 'uuid/v1'

import reducerMap from './dataReducers/index'
import renderReducerMap from './renderReducers/index'
import {combineParallelReducer, combineReducer, createStore} from './stateManager'
import Chart from './Chart'
import enums from './enums/index'

// let _store, // The store for all charts state
//     _chartMap = {} // chart map to quickly find chart

// /**
//  * Trigger render loop
//  */
// function _loop (lastTimestamp) {
//   _loop.animationKey = window.requestAnimationFrame(() => {
//     const now = Date.now()
//     const dt = 1000 / _loop._fps
//     _loop._accumulator = _loop._accumulator ? _loop._accumulator : 0
//     _loop._accumulator += now - lastTimestamp

//     // New frame time
//     if (_loop._accumulator >= dt) {
//       while (_loop._accumulator >= dt) {
//         _loop._accumulator -= dt
//       }

//       for (let chartId of _chartMap) {
//         _chartMap[chartId].render()
//       }
      
//     }
//     _loop(now)
//   })
// }

const chartx = {
  // Frame per second
  fps: 60,

  // expose Enums
  enums,

  // Map to created charts
  chartMap: {},

  /**
   * Init logic for chartx
   */
  init: async () => {
    // Create store for all states
    chartx.store = await createStore(combineReducer(reducerMap))
    // chartx.store = await createStore(combineParallelReducer(reducerMap, 'data_reducer_'))
    // chartx.store = await createStore(combineReducer(reducerMap))

    // Create store for all final render states
    chartx.renderStore = await createStore(combineReducer(renderReducerMap))
    // chartx.renderStore = await createStore(combineParallelReducer(renderReducerMap, 'render_reducer_'))

    // Static function for all charts
    Chart.dispatch = chartx.store.dispatch
    Chart.dispatchRender = chartx.renderStore.dispatch

    // Start animation loop for rendering
    chartx.loop()
  },

  createChart: async (chartConfig) => {
    if (!chartx.store) {
      // This is the first chart chartx ever created.
      // Need to init it first
      await chartx.init()
    }

    const chart = new Chart(chartConfig)
    chartx.chartMap[chart.id] = chart

    return chart
  },

  loop: (lastTimestamp) => {
    const now = Date.now(),
          dt = 1000 / chartx.fps

    chartx.loop.accumulated = chartx.loop.accumulated || 0
    chartx.loop.accumulated += now - lastTimestamp

    if (chartx.loop.accumulated >= dt) {
      while (chartx.loop.accumulated >= dt) {
        chartx.loop.accumulated -= dt
      }

      // Timeout for rendering all charts
      for (let chartKey in chartx.chartMap) {
        chartx.chartMap[chartKey].render(dt)
      }
    }

    window.requestAnimationFrame(() => chartx.loop(now))
  }



  // constant: {
  //   /**
  //    * The special COUNT identifier for calculating while rendering
  //    */
  //   COUNT: uuidv1()
  // },

  // /**
  //  * Spawn a chart instance
  //  */
  // spawn: () => {
  //   // Create store only when the first chart is about to be spawned
  //   if (!_store) {
  //     _store = createStore(createReducer())
  //   }

  //   let newChart = new Chart(_store)
  //   _chartMap[newChart.id] = newChart

  //   return newChart
  // },

  /**
   * Dispose a chart
   */
  // dispose: (chart) => {
  //   if (!chart || !_chartMap[chart.id]) {
  //     return
  //   }

  //   // If we are going to dispose the last chart
  //   if (Object.keys(_chartMap).length === 1 
  //     && _chartMap[chart.id]) {
  //     window.cancelAnimationFrame(_loop.animationKey)
  //     _store = null
  //   }

  //   _chartMap[chart.id] = undefined
  //   chart.dispose()
  // }
}

window.chartx = chartx
export default chartx