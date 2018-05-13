export default class Position {
  /**
   * A simple position object
   * @param {Object} props position properties
   * @param {Number} props.top top in pixel
   * @param {Number} props.left left in pixel
   * @param {Number} props.width width in pixel
   * @param {Number} props.height height in pixel
   */
  constructor (props) {
    this.top = props.top
    this.left = props.left
    this.width = props.width
    this.height = props.height
  }
}