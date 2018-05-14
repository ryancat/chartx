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
      xAxis: backgroundLayer._getXAxisRenderState(store),

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

  /**
   * Get the render state for x axis
   */
  _getXAxisRenderState: (store) => {
    if (store.xAxis.isHidden) {
      // When x axis is hidden, the render state is null
      return null
    }

    let xAxisRenderState = {}

    // switch(xAxisLocationType) {
    //   case locationTypeE.BOTTOM:
    //     // Get x axis position based on store state
    //     // TODO: maybe we should move the height and width calculation
    //     // here as they are for rendering
    //     xAxis.position = new Position({
    //       top: store.yAxis.height,
    //       left: store.yAxis.width,
    //       width: store.xAxis.width,
    //       height: store.xAxis.height
    //     })
    //     break

    //   case locationTypeE.TOP:
    //     xAxis.position = new Position({
    //       top: store.xAxis.height,
    //       left: store.yAxis.width,
    //       width: store.xAxis.width,
    //       height: store.xAxis.height
    //     })
    //     break

    //   default:
    //     throw new Error(`Unexpected location for x axis: ${xAxisLocationType}`)
    // }

    // X axis can be top or bottom depend on the axis states
    xAxisRenderState[locationTypeE.TOP] = {
      position: new Position({
        top: store.xAxis.height,
        left: store.yAxis.width,
        width: store.xAxis.width,
        height: store.xAxis.height
      }),
      // The axis cell map on axis
      axisCellMapByLevel: {}
    }

    xAxisRenderState[locationTypeE.BOTTOM] = {
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
    xAxisRenderState.mainAxisSize = store.xAxis.width
    xAxisRenderState.markSize = Math.max(theme.axis.mark.minSize, store.xAxis.width / store.xAxis.axisLevels[0].values.length)

    // Compute x axis header cell (in tree structure)
    xAxisRenderState.rootAxisCell = AxisCell.buildTree({
      // level states will be used by reference. Should not be mutated.
      levelStates: store.xAxis.axisLevels,
      axisRenderState: xAxisRenderState
    })

    return xAxisRenderState
  }
}

export default backgroundLayer