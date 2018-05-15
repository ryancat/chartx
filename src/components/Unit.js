import uuidv1 from 'uuid/v1'

/**
 * A unit of information that can be rendered
 * 
 * @export
 * @class Unit
 */
export default class Unit {
  /**
   * Creates an instance of Unit.
   * @param {Object} content content to render
   * @param {Position} position the position this unit should be rendered
   * @param {Enum.unitType} unitType the type of unit
   * @param {Object} options other options unit requires
   * @memberof Unit
   */
  constructor (content, position, unitType, options = {}) {
    this.id = uuidv1()
    this.content = content
    this.position = position
    this.type = unitType

    // For other property, just copy over to instance
    for (let optionKey in options) {
      this[optionKey] = options[optionKey]
    }
  }
}