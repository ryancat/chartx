import Layer from '../Layer/Layer'

class BackgroundLayer extends Layer {

  /**
   * 
   * @param {Object} props background layer config props
   * @param {Enum.rendererType} props.rendererType background layer config props
   */
  constructor (props) {
    super()

  }

  /**
   * Render layer
   */
  render () {
    throw new Error('Need implement Layer.render')
  }
}

export default BackgroundLayer