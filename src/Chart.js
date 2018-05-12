import uuidv1 from 'uuid/v1'

import { chartInit, chartLayoutUpdate } from './actions/chartAction'
import layerTypeE from './enums/layerType'
import rendererTypeE from './enums/rendererType'
import Layer from './Layer'

// import {combineReducer, createReducer} from './stateManager'
// import dataReducer from './reducers/dataReducer'
// import frsReducer from './reducers/frsReducer'
// import {
//   storeRefresh
// } from './actions/storeAction'
// import {
//   setRenderer
// } from './actions/chartAction'

const CHARTX_LAYER_CLASS_NAME = 'chartx-layer'

export default class Chart {
  /**
   * @param {Object} chartConfig chart configuration json object
   * @param {String} chartConfig.title chart title
   * @param {Object[]} chartConfig.asepcts chart aspects array that holds data and meta data
   * @param {String} chartConfig.aspects[].aspect chart aspect type
   * @param {String} chartConfig.aspects[].title chart aspect title for display
   * @param {String[]|Number[]|Boolean[]} chartConfig.aspects[].values values for this aspect
   * @param {String[]|Number[]|Boolean[]} chartConfig.aspects[].valueOrder the order that when render values should follow
   * @param {Number} chartConfig.width chart width in pixel
   * @param {Number} chartConfig.height chart height in pixel
   * @param {Number} chartConfig.showDefaultControls show the default controls for chart
   */
  constructor (chartConfig) {
    // Each chart instance should have a unique id to track in state
    this.id = uuidv1()
    this.element = document.createElement('div')
    this.chartConfig = chartConfig

    // Chart will create layers based on layer type enum. Add more layers and implement their API as needed
    this.layerMap = {}
    for (let layerKey in layerTypeE) {
      let layerElement = document.createElement('div')
      layerElement.className = `${layerTypeE[layerKey]} ${CHARTX_LAYER_CLASS_NAME}`
      this.layerMap[layerTypeE[layerKey]] = new Layer({
        container: layerElement
      })
    }

    // Start to create chart
    this.runNewChart()
  }

  /**
   * Run chart workflow
   * init data -> calculate FRS -> render
   */
  async runNewChart () {
    // TODO use pipe runner to chain the async calls
    // Indicate the chart has initialized
    let store = await Chart.dispatch(chartInit(this.id, this.chartConfig))

    // Calculate the chart dimensions for layout
    // TODO directly access store maybe not a good idea,
    // Need to think how to optimize here. This is really just
    // like a container
    store = await Chart.dispatch(chartLayoutUpdate(this.id, {
      xAxisHeight: store.xAxis.height,
      yAxisWidth: store.yAxis.width,
      chartHeight: store.chart.height,
      chartWidth: store.chart.width
    }))

    // Now we have updated store, we need to start rendering
    // TODO: Important
    // After we get the data state, we need to compute the final render state
    // The final render state should be for each layer. Since each layer may have 
    // different renderer hence different FRS representation. However, Chart should
    // not care about how each layer got rendered, or even how many layers in total
    //
    // I think we should move the computing FRS work for each layer inside each
    // layer. Basically each layer should have their own rendering logic, as well as
    // logic to compute FRS. Chart should trigger this process by dispatch the data
    // state to each layer, and wait until CRS is coming back.

    // Chart.dispatch(chartRender(this.id))
    await this.updateLayers(store)
    // this.render()
  }

  /**
   * Update all layers with current chart state
   */
  async updateLayers (store) {
    // return {
    //   renderer: rendererTypeE.CANVAS,
    //   chartElement: this.element,
    //   width: store.chart.width,
    //   height: store.chart.height
    // }

    await this._eachLayerAsync(async (layer) => await layer.update(store))
  }

  /**
   * Render FRS as fast as possible
   * Assume Canvas renderer for now
   */
  render (dt) {
    // if (!this.finalRenderState) {
    //   // No final render state defined for current chart
    //   return
    // }

    // switch(this.finalRenderState.renderer) {
    //   case rendererTypeE.CANVAS:
    //     await canvasRenderer.render(this.finalRenderState, dt)

    //     // this.crs = canvasRenderer.render(this.finalRenderState, this.crs, dt)
    //     break

    //   default:
    //     console.warn(`Renderer not found: ${finalRenderState.renderer}`)
    // }


    // Render each layer in chart
    this._eachLayerAsync((layer) => layer.render(dt))
  }

  /**
   * Iterate each layer in chart
   */
  async _eachLayerAsync (callback) {
    for (let layerKey in this.layerMap) {
      await callback(this.layerMap[layerKey])
    }
  }
}


// this.chartState = {
//   xAxis: {
//     title: 'some x axis title',
//     min: 1,
//     max: 100,
//     height: 40,
//     width: 400,
//     zoom: 1,
//     includeZero: true
//   },

//   yAxis: {
//     title: 'some y axis title',
//     min: 1,
//     max: 100,
//     height: 400,
//     width: 40,
//     zoom: 1,
//     includeZero: true
//   },

//   scene: {
//     panes: [
//       {
//         type: 'dot',
//         marks: [{
//           data: {
//             x: 'Vans',
//             y: 100,
//             color: 'Male'
//           },
//           isSelected: false,
//           isHover: false
//         }, {
//           data: {
//             x: 'Adidas',
//             y: 30,
//             color: 'Male'
//           },
//           isSelected: false,
//           isHover: false
//         }, {
//           data: {
//             x: 'Nike',
//             y: 10,
//             color: 'Male'
//           },
//           isSelected: false,
//           isHover: false
//         }]
//       }, {
//         type: 'bar',
//         marks: [{
//           data: {
//             x: 'Vans',
//             y: 30,
//             color: 'Female'
//           },
//           isSelected: false,
//           isHover: false
//         }, {
//           data: {
//             x: 'Adidas',
//             y: 103,
//             color: 'Female'
//           },
//           isSelected: false,
//           isHover: false
//         }, {
//           data: {
//             x: 'Nike',
//             y: 150,
//             color: 'Female'
//           },
//           isSelected: false,
//           isHover: false
//         }]
//       }
//     ]
//   },

//   legend: {
//     position: 'bottom',
//     colorData: ['Male', 'Female'],
//     palette: 'default'
//   },

//   chart: {
//     title: 'Some chart title'
//   }
// }