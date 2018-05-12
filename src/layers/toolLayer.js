export default {
  /**
   * Compute the final render state for given chart state
   */
  computeFinalRenderState: (store) => {
    console.log('toolLayer computeFinalRenderState', store)
  },

  computeCurrentRenderState: (currentRenderState, finalRenderState, dt) => {
    console.log('toolLayer computeCurrentRenderState', currentRenderState, finalRenderState, dt)
    
  }
}