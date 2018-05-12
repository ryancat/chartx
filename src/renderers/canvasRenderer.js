import BaseRenderer from './BaseRenderer'
import rendererTypeE from '../enums/rendererType'
import layerTypeE from '../enums/layerType'
import { combineReducer, createStore } from '../stateManager'
import backgroundRenderer from './backgroundRenderer'
// import sceneRenderer from './sceneRenderer'

export default class CanvasRenderer extends BaseRenderer {
  constructor () {
    super()
    this.type = rendererTypeE.CANVAS
    this.currentRenderState = createStore(combineReducer({
      backgroundLayer: backgroundRenderer
    }))
    this.dispatch = this.currentRenderState.dispatch
  }

  async render (finalRenderState, dt) {
    // TODO: implement render details for canvas
    // this.initLayers(finalRenderState)
    this.currentRenderState = await this.dispatch({
      finalRenderState,
      dt
    })

    // TODO: actual render logic
    this.initLayers
    // await this.renderBackgroundLayer(finalRenderState, currentRenderState, dt)
    // await this.renderSceneLayer(finalRenderState, currentRenderState, dt)
  }

  // initLayers (finalRenderState) {
  //   if (this.layers) {
  //     return
  //   }

  //   // Create canvas layer if not already existed
  //   let layers = {}
  //   layers[layerTypeE.BACKGROUND] = document.createElement('canvas')
  //   layers[layerTypeE.SCENE] = document.createElement('canvas')

  //   for (let layerKey in layers) {
  //     let layer = layers[layerKey]
  //     layer.setAttribute('width', finalRenderState.width)
  //     layer.setAttribute('height', finalRenderState.height)
  //     layer.className = `${layerKey} chartx-layer`
  //     layer.style.position = 'absolute'
  //     finalRenderState.chartElement.appendChild(layer)
  //   }

  //   this.layers = layers
  // }
}