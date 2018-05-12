import rendererTypeE from '../enums/rendererType'
import CanvasRenderer from './CanvasRenderer'
import SvgRenderer from './SvgRenderer'
import WebGlRenderer from './WebGlRenderer'

const renderer = {

  /**
   * Create renderer instance with given type
   * @param {Enum.rendererType} rendererType The rendererType enum
   */
  createRenderer: (rendererType, container) => {
    switch(rendererType) {
      case rendererTypeE.CANVAS:
        return new CanvasRenderer(container);

      case rendererTypeE.SVG:
        return new SvgRenderer(container);

      case rendererTypeE.WEBGL:
        return new WebGlRenderer(container);

      default:
        throw new Error(`Unexpected renderer type: ${rendererType}`);
    }
  }
}

export default renderer