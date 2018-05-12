import renderer from '../../enums/rendererType'
import canvasRenderer from '../../renderers/canvasRenderer'

class Layer {
  constructor (props) {
    const {
      width, 
      height,
      rendererType
    } = props

    switch (rendererType) {
      case renderer.CANVAS:
        this.renderer = canvasRenderer
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
    throw new Error('Need implement Layer.render')
  }
}

export default Layer