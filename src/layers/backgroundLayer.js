export default {
  /**
   * Compute the final render state for given chart state
   */
  computeFinalRenderState: (store) => {
    console.log('backgroundlayer computeFinalRenderState', arguments)

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

      // X axis position
      xAxis: {
        top: store.scene.height,
        left: store.yAxis.width,
        width: store.xAxis.width,
        height: store.xAxis.height,
      },

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
    console.log('backgroundlayer computeCurrentRenderState', arguments)
    
    // For now, always render final render state. When introducing animation we can
    // fill in the gaps
    return finalRenderState
  }
}