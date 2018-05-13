import uuidv1 from 'uuid/v1'

/**
 * Define an axis cell.
 * Axis cell holds all information renderer need to render an axis cell.
 */
export default class AxisCell {
  /**
   * Create an axis cell inside AxisHeader. AxisCell is a tree node
   * @param {Object} props the properties required to create an axis cell
   * @param {Object} props.levelState all axis cell data in the same level
   * @param {Array} props.cellValueIndexes value indexes for the current axis cell
   */
  constructor (props) {
    this.id = uuidv1()
    this.children = null

    this.levelState = props.levelState
    this.cellValueIndexes = props.cellValueIndexes
  }

  /**
   * Add children axis cell
   * @param {AxisCell} axisCell add one axis cell into children
   */
  addChild (axisCell) {
    this.children = this.children || []
    this.children.push(axisCell)
  }
}