import uuidv1 from 'uuid/v1'

import { chartInit } from './actions/chartAction'
// import {combineReducer, createReducer} from './stateManager'
// import dataReducer from './reducers/dataReducer'
// import frsReducer from './reducers/frsReducer'
// import {
//   storeRefresh
// } from './actions/storeAction'
// import {
//   setRenderer
// } from './actions/chartAction'

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

    // Indicate the chart has initialized
    Chart.dispatch(chartInit(this.id, chartConfig))
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