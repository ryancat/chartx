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

    // // X axis
    // let xAxis = {
    //   position: new Position({
    //     top: store.yAxis.height,
    //     left: store.yAxis.width,
    //     width: store.xAxis.width,
    //     height: store.xAxis.height
    //   })
    // }

    // // Compute x axis header cell (in tree structure)
    // xAxis.rootCell = new AxisCell({
    //   parentPosition: xAxis.position,
    //   locationType: 
    // })

    // Compute x axis header
    // xAxis.axisHeader = new AxisHeader({
    //   axisLevels: store.xAxis.axisLevels,
    //   position: xAxis.position,
    //   aspectType: aspectTypeE.X,
    //   locationType: locationTypeE.BOTTOM
    // })

    // Y axis
    let yAxis = {
      position: new Position({
        top: 0,
        left: 0,
        width: store.yAxis.width,
        height: store.yAxis.height,
      })
    }

    // // Compute y axis header
    // yAxis.axisHeader = new AxisHeader({
    //   axisLevels: store.yAxis.axisLevels,
    //   position: yAxis.position,
    //   aspectType: aspectTypeE.Y,
    //   locationType: locationTypeE.LEFT
    // })

    // X axis cells
    // Here we need to do three things:
    // 1. compute the x axis cell in tree nodes.
    // 2. compose map for nodeId -> node
    // 3. compose map for markId -> nodeId
    // xAxis.axisHeader = new Tree(store.xAxis.axisLevels)
    // xAxis.rootCell = 

    // xAxis.cells = store.xAxis.valueOrder.map((value, valueIndex) => {
    //   const tickCount = store.xAxis.valueOrder,
    //         tickInterval = xAxis.position.width / (tickCount + 1),
    //         position = {
    //           top: xAxis.position.top,
    //           left: xAxis.position.left + (valueIndex + 1) * tickInterval,
    //           width: tickInterval
    //         }
    // })

    const axisOffset = backgroundLayer._getAxisOffset(store)

    return {
      // Chart position
      chart: {
        top: 0,
        left: 0,
        width: store.chart.width,
        height: store.chart.height
      },
      // chartTop: 0,
      // chartLeft: 0,
      // chartWidth: store.chart.width,
      // chartHeight: store.chart.height,

      // X axis
      xAxis: backgroundLayer._getXAxisRenderState(store, axisOffset),

      // Y axis position
      yAxis,
      
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

  /**
   * Get the render state for x axis
   */
  _getXAxisRenderState: (store, axisOffset) => {
    if (store.xAxis.isHidden) {
      // When x axis is hidden, the render state is null
      return null
    }

    let xAxisRenderState = {}

    // X axis can be top or bottom depend on the axis states
    xAxisRenderState[locationTypeE.TOP] = {
      position: new Position({
        top: axisOffset[locationTypeE.TOP],
        left: axisOffset[locationTypeE.LEFT],
        width: store.xAxis.width,
        height: store.xAxis.height
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    xAxisRenderState[locationTypeE.BOTTOM] = {
      position: new Position({
        top: store.chart.height - axisOffset[locationTypeE.BOTTOM],
        left: axisOffset[locationTypeE.LEFT],
        width: store.xAxis.width,
        height: store.xAxis.height
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    // All used for calculating position information for axis cells
    xAxisRenderState.mainAxisSize = store.xAxis.width
    xAxisRenderState.markSize = Math.max(theme.axis.mark.minSize, store.xAxis.width / store.xAxis.axisLevels[0].values.length)

    // Compute x axis header cell (in tree structure)
    xAxisRenderState.rootAxisCell = AxisCell.buildTree({
      // level states will be used by reference. Should not be mutated.
      levelStates: store.xAxis.axisLevels,
      axisRenderState: xAxisRenderState
    })

    return xAxisRenderState
  },

  /**
   * Get the render state for y axis
   */
  _getYAxisRenderState: (store) => {
    if (store.yAxis.isHidden) {
      // When x axis is hidden, the render state is null
      return null
    }

    let yAxisRenderState = {}

    // X axis can be top or bottom depend on the axis states
    yAxisRenderState[locationTypeE.LEFT] = {
      position: new Position({
        top: store.xAxis.height,
        left: store.yAxis.width,
        width: store.xAxis.width,
        height: store.xAxis.height
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    yAxisRenderState[locationTypeE.BOTTOM] = {
      position: new Position({
        top: store.yAxis.height,
        left: store.yAxis.width,
        width: store.xAxis.width,
        height: store.xAxis.height
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    // All used for calculating position information for axis cells
    yAxisRenderState.mainAxisSize = store.xAxis.width
    yAxisRenderState.markSize = Math.max(theme.axis.mark.minSize, store.xAxis.width / store.xAxis.axisLevels[0].values.length)

    // Compute x axis header cell (in tree structure)
    yAxisRenderState.rootAxisCell = AxisCell.buildTree({
      // level states will be used by reference. Should not be mutated.
      levelStates: store.xAxis.axisLevels,
      axisRenderState: yAxisRenderState
    })

    return yAxisRenderState
  }
}

export default backgroundLayer