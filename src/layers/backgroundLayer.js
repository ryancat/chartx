import aspectTypeE from '../enums/aspectType'
import locationTypeE from '../enums/locationType'
import Position from '../components/Position'
// import Tree from '../components/Tree'
// import AxisHeader from '../components/AxisHeader'
import AxisCell from '../components/AxisCell'
import theme from '../theme'

const backgroundLayer = {
  /**
   * Compute the final render state for given final render store
   */
  computeFinalRenderState: (finalRenderStore) => {
    // Here we need to do three things:
    // 1. compute the axis cell in tree nodes.
    // 2. compose map for nodeId -> node
    // 3. compose map for markId -> nodeId

    return {
      // Chart position
      chart: finalRenderStore.chart,

      // X axis
      xAxis: finalRenderStore.xAxis,

      // Y axis position
      yAxis: finalRenderStore.yAxis,

      // Scene position
      // sceneTop: 0,
      // sceneLeft: store.yAxis.width,
      // sceneWidth: store.scene.width,
      // sceneHeight: store.scene.height
    }
  },

  computeCurrentRenderState: (currentRenderState, finalRenderState, dt) => {
    // For now, always render final render state. When introducing animation we can
    // fill in the gaps
    return finalRenderState
  }
}

export default backgroundLayer