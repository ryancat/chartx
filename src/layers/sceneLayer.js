export default {
  /**
   * Compute the final render state for given chart state
   */
  computeFinalRenderState: (store) => {
    console.log('sceneLayer computeFinalRenderState', store)
  },

  computeCurrentRenderState: (currentRenderState, finalRenderState, dt) => {
    console.log('sceneLayer computeCurrentRenderState', currentRenderState, finalRenderState, dt)
    
  }
}