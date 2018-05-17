import produce from 'immer'
import _ from 'lodash'

import locationTypeE from '../enums/locationType'
import aspectTypeE from '../enums/aspectType'
import AxisCell from '../components/AxisCell'
import Position from '../components/Position'
import theme from '../theme'

const axisRenderReducerUtil = {
  storeUpdate: (state, action) => {
    const {aspectType, chartId, store} = action

    return produce(state, (draftState) => {
      let axisState,
          mainAxisSize

      const axisOffset = axisRenderReducerUtil._getAxisOffset(store)

      // Compute all locations for axis
      draftState.location = {}
      switch (aspectType) {
        case aspectTypeE.X:
          axisState = store.xAxis
          mainAxisSize = store.chart.width - axisOffset[locationTypeE.LEFT] - axisOffset[locationTypeE.RIGHT]

          draftState.location[locationTypeE.TOP] = {
            position: new Position({
              top: 0,
              left: axisOffset[locationTypeE.LEFT],
              width: mainAxisSize,
              height: axisOffset[locationTypeE.TOP]
            }),
            // The axis cell map on axis
            axisCellMapByLevel: {}
          }
      
          draftState.location[locationTypeE.BOTTOM] = {
            position: new Position({
              top: store.chart.height - axisOffset[locationTypeE.BOTTOM],
              left: axisOffset[locationTypeE.LEFT],
              width: mainAxisSize,
              height: axisOffset[locationTypeE.BOTTOM]
            }),
            // The axis cell map on axis
            axisCellMapByLevel: {}
          }
          break

        case aspectTypeE.Y:
          axisState = store.yAxis
          mainAxisSize = store.chart.height - axisOffset[locationTypeE.TOP] - axisOffset[locationTypeE.BOTTOM]

          draftState.location[locationTypeE.LEFT] = {
            position: new Position({
              top: axisOffset[locationTypeE.TOP],
              left: 0,
              width: axisOffset[locationTypeE.LEFT],
              height: mainAxisSize
            }),
            // The axis cell map on axis
            axisCellMapByLevel: {}
          }
      
          draftState.location[locationTypeE.RIGHT] = {
            position: new Position({
              top: axisOffset[locationTypeE.TOP],
              left: store.chart.width - axisOffset[locationTypeE.RIGHT],
              width: axisOffset[locationTypeE.RIGHT],
              height: mainAxisSize
            }),
            // The axis cell map on axis
            axisCellMapByLevel: {}
          }
          break
        
        default:
          throw new Error(`Unexpected aspect type: ${aspectType}`)
      }
      
      draftState.isHidden = !!axisState.isHidden

      // All used for calculating position information for axis cells
      draftState.mainAxisSize = mainAxisSize
      draftState.markSize = Math.max(theme.axis.mark.minSize, mainAxisSize / axisState.aspectsMap[aspectType][0].values.length)

      // Compute x axis header cell (in tree structure)
      draftState.rootAxisCell = AxisCell.buildTree({
        // level states will be used by reference. Should not be mutated.
        levelStates: axisState.aspectsMap[aspectType],
        axisRenderState: draftState
      })
    })
  },

  _getAxisOffset: (store) => {
    let axisOffset = {},
        xAxisLevelStates = store.xAxis.aspectsMap[aspectTypeE.X],
        yAxisLevelStates = store.yAxis.aspectsMap[aspectTypeE.Y]

    // Aggregate number of axis levels that are at certain
    // location type. This affects the position calculation.
    // TODO: axis label actual width or height can be calculated here
    // if not using the levelSize
    axisOffset[locationTypeE.TOP] = _.sum(
      _.filter(xAxisLevelStates, { locationType: locationTypeE.TOP })
      .map(axisLevelState => axisLevelState.levelSize)
    ),
    axisOffset[locationTypeE.BOTTOM] = _.sum(
      _.filter(xAxisLevelStates, { locationType: locationTypeE.BOTTOM })
      .map(axisLevelState => axisLevelState.levelSize)
    ),
    axisOffset[locationTypeE.LEFT] = _.sum(
      _.filter(yAxisLevelStates, { locationType: locationTypeE.LEFT })
      .map(axisLevelState => axisLevelState.levelSize)
    ),
    axisOffset[locationTypeE.RIGHT] = _.sum(
      _.filter(yAxisLevelStates, { locationType: locationTypeE.RIGHT })
      .map(axisLevelState => axisLevelState.levelSize)
    )

    return axisOffset
  }
}

export default axisRenderReducerUtil