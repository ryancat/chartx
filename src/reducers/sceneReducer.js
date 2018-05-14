// import produce from 'immer'

// import { CHART_INIT, CHART_LAYOUT_UPDATE } from '../actions/chartAction'
// import aspectTypeE from '../enums/aspectType'
// import markTypeE from '../enums/markType'

// const defaultState = {
//   // panes: [
//   //   {
//   //     type: 'dot',
//   //     marks: [{
//   //       data: {
//   //         x: 'Vans',
//   //         y: 100,
//   //         color: 'Male'
//   //       },
//   //       isSelected: false,
//   //       isHover: false
//   //     }, {
//   //       data: {
//   //         x: 'Adidas',
//   //         y: 30,
//   //         color: 'Male'
//   //       },
//   //       isSelected: false,
//   //       isHover: false
//   //     }, {
//   //       data: {
//   //         x: 'Nike',
//   //         y: 10,
//   //         color: 'Male'
//   //       },
//   //       isSelected: false,
//   //       isHover: false
//   //     }]
//   //   }, {
//   //     type: 'bar',
//   //     marks: [{
//   //       data: {
//   //         x: 'Vans',
//   //         y: 30,
//   //         color: 'Female'
//   //       },
//   //       isSelected: false,
//   //       isHover: false
//   //     }, {
//   //       data: {
//   //         x: 'Adidas',
//   //         y: 103,
//   //         color: 'Female'
//   //       },
//   //       isSelected: false,
//   //       isHover: false
//   //     }, {
//   //       data: {
//   //         x: 'Nike',
//   //         y: 150,
//   //         color: 'Female'
//   //       },
//   //       isSelected: false,
//   //       isHover: false
//   //     }]
//   //   }
//   // ]

//   panes: [],
//   height: 360,
//   width: 360
// }

// function createAspectCube (aspects, xAspect, yAspect) {
//   let cube = []

//   for (let asp of aspects) {
//     if (asp.aspect === aspectTypeE.X && asp !== xAspect
//     || asp.aspect === aspectTypeE.Y && asp !== yAspect) {
//       // We are creating aspect cube based on given x and y aspects
//       continue
//     }

//     cube.push(asp.values)
//   }

//   return cube
// }

// export default (state = defaultState, action) => {
//   switch (action.type) {
//     case CHART_INIT:
//       return produce(state, (draftState) => {
//         // Chart init. Create panes based on x/y axis config
//         // TODO: Assume other than x or y, there will be only one
//         // aspect per each aspect
//         const chartConfig = action.chartConfig,
//               aspects = chartConfig.aspects,
//               xAspects = _.filter(aspects, { aspect: aspectTypeE.X }),
//               yAspects = _.filter(aspects, { aspect: aspectTypeE.Y })

//         for (let i = 0; i < xAspects.length; i++) {
//           for (let j = 0; j < yAspects.length; j++) {
//             // For each x and y, we need to create a pane
//             const xAspect = xAspects[i],
//                   yAspect = yAspects[j],
//                   markType = yAspects.length >= xAspects.length ? yAspect.markType : xAspect.markType,
//                   aspectCube = createAspectCube(aspects, xAspect, yAspect),
//                   aspectSlices = _.zip(...aspectCube)

//             draftState.panes.push({
//               xIndex: i,
//               yIndex: j,
//               totalXPanes: xAspects.length,
//               totalYPanes: yAspects.length,
//               markType: markType,
//               marks: aspectSlices.map((aspectSlice) => {
//                 let data = {}

//                 aspectSlice.forEach((aspectData, aspectIndex) => {
//                   data[aspects[aspectIndex].aspect] = aspectData
//                 })

//                 return {
//                   data,
//                   isSelected: false,
//                   isHover: false
//                 }
//               }),
//               width: draftState.width / xAspects.length,
//               height: draftState.height / yAspects.length
//             })
//           }
//         }
//       })

//     case CHART_LAYOUT_UPDATE:
//       // We need to calculate the chart component dimensions
//       // to prepare for rendering
//       return produce(state, (draftState) => {
//         draftState.height = action.chartDimensions.chartHeight - action.chartDimensions.xAxisHeight
//         draftState.width = action.chartDimensions.chartWidth - action.chartDimensions.yAxisWidth

//         // Update panes
//         draftState.panes.forEach(pane => {
//           pane.width = draftState.width / pane.totalXPanes
//           pane.height = draftState.height / pane.totalYPanes
//         })
//       })

//     default:
//       return state
//   }
// }