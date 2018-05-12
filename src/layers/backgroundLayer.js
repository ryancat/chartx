export default {
  /**
   * Compute the final render state for given chart state
   */
  computeFinalRenderState: (store) => {
    console.log('backgroundlayer computeFinalRenderState', store)

    // X axis
    let xAxis = {
      position: {
        top: store.scene.height,
        left: store.yAxis.width,
        width: store.xAxis.width,
        height: store.xAxis.height
      }
    }

    // xAxis.rootCell = 

    xAxis.cells = store.xAxis.valueOrder.map((value, valueIndex) => {
      const tickCount = store.xAxis.valueOrder,
            tickInterval = xAxis.position.width / (tickCount + 1),
            position = {
              top: xAxis.position.top,
              left: xAxis.position.left + (valueIndex + 1) * tickInterval,
              width: tickInterval
            }
    })

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
      yAxis: {
        top: 0,
        left: 0,
        width: store.yAxis.width,
        height: store.yAxis.height,
      }
      
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