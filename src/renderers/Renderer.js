import rendererTypeE from '../enums/rendererType'
import CanvasRenderer from './CanvasRenderer'
import SvgRenderer from './SvgRenderer'
import WebGlRenderer from './WebGlRenderer'

const renderer = {

  /**
   * Create renderer instance with given type
   * @param {Enum.rendererType} rendererType The rendererType enum
   */
  createRenderer: (rendererType) => {
    switch(rendererType) {
      case rendererTypeE.CANVAS:
        return new CanvasRenderer()

      case rendererTypeE.SVG:
        return new SvgRenderer()

      case rendererTypeE.WEBGL:
        return new WebGlRenderer()

      default:
        throw new Error(`Unexpected renderer type: ${rendererType}`);
    }
  }
}

export default renderer