import renderer from './renderers/renderer'

/**
 * Layer class represent a layer object and holds render states.
 * The actual rendering logic for this layer depend on the renderer
 * used for this layer.
 */
export default class Layer {
  constructor (props) {
    this.container = props.container
    // Set the current/final render state to null initially
    this.currentRenderState = null
    this.finalRenderState = null

    // The renderer is unkown until being set
    this.renderer = null
  }

  /**
   * Render this layer with given renderer
   * @param {Number} dt the time difference between last render controled by animation loop
   */
  render (dt) {
    if (!this.renderer || !this.finalRenderState || this.isEqualRenderState()) {
      // No renderer defined or no final render state need to render towards to.
      return
    }

    // Compute current render state
    this.currentRenderState = this.computeCurrentRenderState(this.currentRenderState, this.finalRenderState, dt)

    // Render the layer using the layer's renderer 
    this.renderer.render(this.currentRenderState)
  }

  /**
   * Update layer renderer and final render state
   * @param {Object|Array} store the chart data state
   */
  update (store) {
    const expectedRendererType = store.chart.rendererType
    // Set renderer
    if (!this.renderer) {
      this.renderer = renderer.createRenderer(expectedRendererType)
    }

    if (this.renderer.type !== expectedRendererType) {
      // Update renderer to a different type is future work
      throw new Error('Do not support update renderer after created for now')
    }

    // Compute final render state
    this.finalRenderState = this.computeFinalRenderState(store)
    
    return {
      renderer: store.chart.renderer,
      chartElement: this.container,
      width: store.chart.width,
      height: store.chart.height
    }
  }

  /**
   * Compute and return the new current render state
   * This function could run in child process or web worker
   * @param {Object|Array} currentRenderState the current rendering state for this layer
   * @param {*} finalRenderState the final rendering state for this layer
   * @param {*} dt time difference since last render
   */
  computeCurrentRenderState (currentRenderState, finalRenderState, dt) {

  }

  /**
   * Compute and return the final render state
   * This function could run in child process or web worker
   * @param {Object|Array} store the chart state
   */
  computeFinalRenderState (store) {

  }
 }