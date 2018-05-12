/**
 * The base renderer interface
 */
export default class BaseRenderer {
  // drawLine () {
    
  // }

  // drawDot () {

  // }

  // drawRect () {

  // }

  render () {
    throw new Error(`${this.type} renderer should implement render function`)
  }
}