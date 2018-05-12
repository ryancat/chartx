import BaseRenderer from './BaseRenderer'
import rendererTypeE from '../enums/rendererType'
// import sceneRenderer from './sceneRenderer'

export default class CanvasRenderer extends BaseRenderer {
  constructor (container) {
    super()
    this.type = rendererTypeE.CANVAS
    this.container = container
  }

  /**
   * 
   * @param {Object|Array} renderState The render state for canvas to render
   */
  render (renderState) {
    this.initCanvas(renderState)
    // await this.renderBackgroundLayer(finalRenderState, currentRenderState, dt)
    // await this.renderSceneLayer(finalRenderState, currentRenderState, dt)
  }

  initCanvas (renderState) {
    if (this.element) {
      return
    }

    // Create canvas element if not already existed
    let canvas = document.createElement('canvas')
    canvas.setAttribute('width', renderState.width)
    canvas.setAttribute('height', renderState.height)
    canvas.style.position = 'absolute'

    this.element = canvas
    this.container.appendChild(this.element)
  }
}