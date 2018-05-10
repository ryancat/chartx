import Renderer from './Renderer'
import renderer from '../enums/renderer'

class CanvasRenderer extends Renderer {
  constructor () {
    super()
    this.type = renderer.CANVAS
  }
}

export default new CanvasRenderer()