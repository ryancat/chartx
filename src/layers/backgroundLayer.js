import aspectTypeE from '../enums/aspectType'
import locationTypeE from '../enums/locationType'
import Position from '../components/Position'
// import Tree from '../components/Tree'
// import AxisHeader from '../components/AxisHeader'
import AxisCell from '../components/AxisCell2'
import theme from '../theme'

const backgroundLayer = {
  /**
   * Compute the final render state for given chart state
   */
  computeFinalRenderState: (store) => {
    console.log('backgroundlayer computeFinalRenderState', store)

    // Here we need to do three things:
    // 1. compute the axis cell in tree nodes.
    // 2. compose map for nodeId -> node
    // 3. compose map for markId -> nodeId

    const axisOffset = backgroundLayer._getAxisOffset(store)

    return {
      // Chart position
      chart: new Position({
        top: 0,
        left: 0,
        width: store.chart.width,
        height: store.chart.height
      }),

      // X axis
      xAxis: backgroundLayer._getAxisRenderState(aspectTypeE.X, store, axisOffset),

      // Y axis position
      yAxis: backgroundLayer._getAxisRenderState(aspectTypeE.Y, store, axisOffset),
      
      // Scene position
      // sceneTop: 0,
      // sceneLeft: store.yAxis.width,
      // sceneWidth: store.scene.width,
      // sceneHeight: store.scene.height
    }
  },

  computeCurrentRenderState: (currentRenderState, finalRenderState, dt) => {
    console.log('backgroundlayer computeCurrentRenderState', currentRenderState, finalRenderState, dt)
    
    // For now, always render final render state. When introducing animation we can
    // fill in the gaps
    return finalRenderState
  },

  _getAxisOffset: (store) => {
    let axisOffset = {},
        xAxisLevelStates = store.xAxis.axisLevels,
        yAxisLevelStates = store.yAxis.axisLevels

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
  },

  _getAxisRenderState: (aspectType, store, axisOffset) => {
    let axisState,
        mainAxisSize

    switch (aspectType) {
      case aspectTypeE.X:
        axisState = store.xAxis
        mainAxisSize = store.chart.width - axisOffset[locationTypeE.LEFT] - axisOffset[locationTypeE.RIGHT]
        break

      case aspectTypeE.Y:
        axisState = store.yAxis
        mainAxisSize = store.chart.height - axisOffset[locationTypeE.TOP] - axisOffset[locationTypeE.BOTTOM]
        break
      
      default:
        throw new Error(`Unexpected aspect type: ${aspectType}`)
    }
    
    if (axisState.isHidden) {
      // When x axis is hidden, the render state is null
      return null
    }

    let axisRenderState = {}

    // Compute all locations for axis
    axisRenderState.location = {}
    axisRenderState.location[locationTypeE.TOP] = {
      position: new Position({
        top: axisOffset[locationTypeE.TOP],
        left: axisOffset[locationTypeE.LEFT],
        width: mainAxisSize,
        height: axisOffset[locationTypeE.TOP]
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    axisRenderState.location[locationTypeE.BOTTOM] = {
      position: new Position({
        top: store.chart.height - axisOffset[locationTypeE.BOTTOM],
        left: axisOffset[locationTypeE.LEFT],
        width: mainAxisSize,
        height: axisOffset[locationTypeE.BOTTOM]
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    axisRenderState.location[locationTypeE.LEFT] = {
      position: new Position({
        top: axisOffset[locationTypeE.TOP],
        left: axisOffset[locationTypeE.LEFT],
        width: axisOffset[locationTypeE.LEFT],
        height: mainAxisSize
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    axisRenderState.location[locationTypeE.RIGHT] = {
      position: new Position({
        top: axisOffset[locationTypeE.TOP],
        left: store.chart.width - axisOffset[locationTypeE.RIGHT],
        width: axisOffset[locationTypeE.RIGHT],
        height: mainAxisSize
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    // All used for calculating position information for axis cells
    axisRenderState.mainAxisSize = mainAxisSize
    axisRenderState.markSize = Math.max(theme.axis.mark.minSize, mainAxisSize / axisState.axisLevels[0].values.length)

    // Compute x axis header cell (in tree structure)
    axisRenderState.rootAxisCell = AxisCell.buildTree({
      // level states will be used by reference. Should not be mutated.
      levelStates: axisState.axisLevels,
      axisRenderState
    })

    return axisRenderState
  }
}

export default backgroundLayer