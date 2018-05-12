export default {
  /**
   * Compute the final render state for given chart state
   */
  computeFinalRenderState: (store) => {
    console.log('backgroundlayer computeFinalRenderState', arguments)

    return {
      // Chart position
      // chartTop: 0,
      // chartLeft: 0,
      // chartWidth: store.chart.width,
      // chartHeight: store.chart.height,

      // X axis position
      xAxisTop: store.scene.height,
      xAxisLeft: store.yAxis.width,
      xAxisWidth: store.xAxis.width,
      xAxisHeight: store.xAxis.height,

      // Y axis position
      yAxisTop: 0,
      yAxisLeft: 0,
      yAxisWidth: store.yAxis.width,
      yAxisHeight: store.yAxis.height,

      // Scene position
      // sceneTop: 0,
      // sceneLeft: store.yAxis.width,
      // sceneWidth: store.scene.width,
      // sceneHeight: store.scene.height
    }
  },

  computeCurrentRenderState: (currentRenderState, finalRenderState, dt) => {
    console.log('backgroundlayer computeCurrentRenderState', arguments)
    
    // For now, always render final render state. When introducing animation we can
    // fill in the gaps
    return finalRenderState
  }
}