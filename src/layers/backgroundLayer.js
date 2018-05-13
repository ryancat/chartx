import Position from '../components/Position'
// import Tree from '../components/Tree'
import AxisHeader from '../components/AxisHeader'

export default {
  /**
   * Compute the final render state for given chart state
   */
  computeFinalRenderState: (store) => {
    console.log('backgroundlayer computeFinalRenderState', store)

    // X axis
    let xAxis = {
      position: new Position({
        top: store.yAxis.height,
        left: store.yAxis.width,
        width: store.xAxis.width,
        height: store.xAxis.height
      })
    }

    // Compute x axis header
    xAxis.axisHeader = new AxisHeader({
      axisLevels: store.xAxis.axisLevels,
      position: xAxis.position
    })

    // Y axis
    let yAxis = {
      position: new Position({
        top: 0,
        left: 0,
        width: store.yAxis.width,
        height: store.yAxis.height,
      })
    }

    // Compute y axis header
    yAxis.axisHeader = new AxisHeader({
      axisLevels: store.yAxis.axisLevels,
      position: yAxis.position
    })

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
      xAxis,

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
  }
}