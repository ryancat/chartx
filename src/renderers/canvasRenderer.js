import _ from 'lodash'

import BaseRenderer from './BaseRenderer'
import rendererTypeE from '../enums/rendererType'
import locationTypeE from '../enums/locationType'
import directionTypeE from '../enums/directionType'
import theme from '../theme'
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
    this.renderAxis(renderState.xAxis)
    this.renderAxis(renderState.yAxis)
    // this.renderXAxis(renderState)
    // this.renderYAxis(renderState)
    // this.renderYAxis(renderState)
  }

  initCanvas (renderState) {
    if (!this.element) {
      // Create canvas element if not already existed
      let canvas = document.createElement('canvas'),
          chartRenderState = renderState.chart

      canvas.setAttribute('width', chartRenderState.width)
      canvas.setAttribute('height', chartRenderState.height)

      this.element = canvas
      this.container.appendChild(this.element)
    }

    // Clean current layer to prepare render new state
    this.clearCanvas()
  }

  /**
   * Clear current canvas layer
   */
  clearCanvas () {
    this.element.getContext('2d').clearRect(0, 0, this.element.width, this.element.height)
  }

  renderAxis (axisRenderState) {
    if (!axisRenderState) {
      return
    }

    let context = this.element.getContext('2d')

    // Render all locations for axis
    for (let locationType in axisRenderState.location) {
      let location = axisRenderState.location[locationType]

      for (let axisCellLevel in location.axisCellMapByLevel) {
        let axisCellsInSameLevel = location.axisCellMapByLevel[axisCellLevel]

        for (let axisCell of axisCellsInSameLevel) {
          // Draw the rect to make sure we are rendering in correct position
          // TODO: remove this
          this.drawRect(context, axisCell.position)

          // Draw axis title
          this.renderTextUnit(axisCell.titleUnit)

          // Draw axis labels
          for (let labelUnit of axisCell.labelUnits) {
            this.renderTextUnit(labelUnit)
          }
        }
        // this.drawRect(context, location.position)
      }
    }
  }

  renderTextUnit (textUnit) {
    let context = this.element.getContext('2d')
    this.drawText(
      context, 
      textUnit.content, 
      textUnit.position, 
      Object.assign({}, theme.axis[textUnit.type], textUnit.fontOptions))
  }

  // /**
  //  * Render the x axis
  //  * @param {Object} renderState the render state renderer will render
  //  */
  // renderXAxis (renderState) {
  //   console.log('renderState', renderState)
  //   let xAxisRenderState = renderState.xAxis
  //   if (!xAxisRenderState) {
  //     // No x axis to render
  //     return
  //   }

  //   // Use xAxisRenderState.rootAxisCell to render all axis cells

  //   let context = this.element.getContext('2d')
  //   // Render the x axis line
  //   context.beginPath()
  //   context.moveTo(xAxisRenderState.left, xAxisRenderState.top)
  //   context.lineTo(xAxisRenderState.left + xAxisRenderState.width, xAxisRenderState.top)
  //   context.stroke()

  //   // Render ticks
  // }

  // /**
  //  * Render the y axis
  //  * @param {Object} renderState the render state renderer will render
  //  */
  // renderYAxis (renderState) {
  //   let yAxisRenderState = renderState.yAxis
  //   if (!yAxisRenderState) {
  //     // No y axis to render
  //     return
  //   }
    
  //   let context = this.element.getContext('2d')
  //   context.beginPath()
  //   context.moveTo(yAxisRenderState.left + yAxisRenderState.width, yAxisRenderState.top)
  //   context.lineTo(yAxisRenderState.left + yAxisRenderState.width, yAxisRenderState.top + yAxisRenderState.height)
  //   context.stroke()
  // }

  /**
   * Draw a rect with given context and position
   * 
   * @param {CanvasRenderingContext2D} context 
   * @param {Position} position the position object
   * @param {Number} position.x x position
   * @param {Number} position.y y position
   * @param {Number} position.width width size
   * @param {Number} position.height height size
   */
  drawRect (context, position) {
    const {top, left, width, height} = position
    context.strokeRect(left, top, width, height)
  }

  /**
   * Draw text in canvas context
   * 
   * @param {CanvasRenderingContext2D} context 
   * @param {String} content the text content to draw
   * @param {Position} position the position to draw text
   * @param {Object} [fontOptions={}] optional font options
   * @memberof CanvasRenderer
   */
  drawText (context, content, position, fontOptions = {}) {
    const {top, left, width, height} = position,
          fontOptionOrder = [
            'fontStyle', 'fontVariant', 'fontWeight',
            'fontSize', 'lineHeight', 'fontFamily'
          ]

    let font = ''
    for (let fontOption of fontOptionOrder) {
      font += ` ${fontOptions[fontOption] || ''}`
    }

    // Start draw
    context.save()
    context.textAlign = fontOptions.textAlign || 'center'
    context.textBaseline = fontOptions.textBaseline || 'middle'
    context.font = font
    if (fontOptions.directionType === directionTypeE.VERTICAL) {
      // Need to rotate text
      
      context.translate(left + width / 2, top + height / 2)
      context.rotate(-Math.PI / 2)
      context.fillText(content, 0, 0)
    }
    else {
      context.fillText(content, left + width / 2, top + height / 2)
    }
    context.restore()

    // TODO: For debug only
    context.save()
    context.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    context.globalAlpha = 0.5
    context.fillRect(left, top, width, height)
    context.restore()
  }
}