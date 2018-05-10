import renderer from '../../enums/renderer'
import canvasRenderer from '../../renderers/canvasRenderer'

class Layer {
  constructor (props) {
    const {
      width, 
      height,
      renderer
    } = props

    switch (renderer) {
      default:
        this.renderer = canvasRenderer
    }

    this.width = width
    this.height = height
  }

  /**
   * Render layer
   */
  render () {
    console.warn('Need implement Layer.render')
  }
}

export default Layer