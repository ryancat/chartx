import uuidv1 from 'uuid/v1'

import aspectTypeE from '../enums/aspectType'
import locationTypeE from '../enums/locationType'

/**
 * Define an axis cell.
 * Axis cell holds all information renderer need to render an axis cell.
 */
export default class AxisCell {
  /**
   * Create an axis cell inside AxisHeader. AxisCell is a tree node
   * @param {Object} props the properties required to create an axis cell
   * @param {Object} props.levelState all axis cell data in the same level
   * @param {Array} props.valueIndexes value indexes for the current axis cell
   */
  constructor (props) {
    this.id = uuidv1()
    this.children = []

    this.levelState = props.levelState
    this.valueIndexes = props.valueIndexes
    this.aspectType = props.aspectType
    this.locationType = props.locationType
    this.parentPosition = props.parentPosition
    this.parentPositionMainOffset = props.parentPositionMainOffset

    if (this.aspectType !== aspectTypeE.X && this.aspectType !== aspectTypeE.Y) {
      // Axis cell are only for axis. Currently only X and Y axes are supported
      throw new Error(`Unexpected aspect type for axis: ${this.aspectType}`)
    }

    // Default location types
    if (!this.locationType) {
      if (this.aspectType === aspectTypeE.X) {
        // For x axis, default location is at bottom
        this.locationType = locationTypeE.BOTTOM
      }
      else if (this.aspectType === aspectTypeE.Y) {
        // For y axis, default location is at left
        this.locationType = locationTypeE.LEFT
      }
    }
  }

  /**
   * Add children axis cell
   * @param {AxisCell} axisCell add one axis cell into children
   */
  addChild (axisCell) {
    this.children.push(axisCell)
  }

  /**
   * Update axis cell position
   */
  updateCellPosition () {
    switch(this.locationType) {
      case locationTypeE.TOP:
      case locationTypeE.LEFT:
        this._updateCellPositionFromTopLeft()
        break

      case locationTypeE.BOTTOM:
      case locationTypeE.RIGHT:
        this._updateCellPositionFromBottomRight()
    }
  }

  _updateCellPositionFromTopLeft () {
    // For x and y axis, their main/cross dimension are different
    const mainAxisPositionKey = aspectType === aspectTypeE.X ? 'width' : aspectType === aspectTypeE.Y ? 'height' : null,
          crossAxisPositionKey = aspectType === aspectTypeE.X ? 'height' : aspectType === aspectTypeE.Y ? 'width' : null

    // Calculate position
    // Position is from top left corner
    let position = {
      top: this.parentPosition.top,
      left: this.parentPosition.left
    }
    // The main axis dimension is the same to parent position
    position[mainAxisPositionKey] = this.parentPosition[mainAxisPositionKey]
    // The cross axis dimension is depend on the level size
    position[crossAxisPositionKey] = this.levelState.levelSize
    this.position = new Position(position)
    
    // Calculate title position
    // Title differs from cell only at cross axis dimension
    position[crossAxisPositionKey] = this.levelState.titleSize
    this.titleState = {
      position: new Position(position),
      displayValue: this.levelState.title
    }

    // Calculate label positions
    // Labels are for each value in this aspect 
    let labelStates = []
    this.levelState.valueOrder.map((value, valueIndex) => {
      let position = {
        top: this.titleState.position
      }
      let labelState = {
        position: new Position()
      }
    })

    if (childrenAxisLevels.length) {
      // There are more axis levels 

    }
  }

  // buildAxisCell (axisLevelStates, parentPosition, aspectType, locationType) {
  //   switch (locationType) {
  //     case locationTypeE.TOP:
  //     case locationTypeE.LEFT:
  //       this.buildAxisCellFromTopLeft(axisLevelStates, parentPosition, aspectType)
  //       break

  //     case locationTypeE.BOTTOM:
  //     case locationTypeE.RIGHT:
  //       this.buildAxisCellFromBottomRight(axisLevelStates, parentPosition, aspectType)
  //   }
  // }

  // buildAxisCellFromTopLeft (axisLevelStates = [], aspectType, ) {
  //   // For x and y axis, their main/cross dimension are different
  //   const axisLevelState = axisLevelStates[0],
  //         childrenAxisLevels = axisLevelStates.slice(1),
  //         mainAxisPositionKey = aspectType === aspectTypeE.X ? 'width' : aspectType === aspectTypeE.Y ? 'height' : null,
  //         crossAxisPositionKey = aspectType === aspectTypeE.X ? 'height' : aspectType === aspectTypeE.Y ? 'width' : null

  //   if (!axisLevel) {
  //     // No axis level state to build
  //     return
  //   }

  //   // Calculate position
  //   // Position is from top left corner
  //   let position = {
  //     top: parentPosition.top,
  //     left: parentPosition.left
  //   }
  //   // The main axis dimension is the same to parent position
  //   position[mainAxisPositionKey] = parentPosition[mainAxisPositionKey]
  //   // The cross axis dimension is depend on the level size
  //   position[crossAxisPositionKey] = axisLevelState.levelSize
  //   this.position = new Position(position)
    
  //   // Calculate title position
  //   // Title differs from cell only at cross axis dimension
  //   position[crossAxisPositionKey] = axisLevelState.titleSize
  //   this.titleState = {
  //     position: new Position(position),
  //     displayValue: axisLevelState.title
  //   }

  //   // Calculate label positions
  //   // Labels are for each value in this aspect 
  //   let labelStates = []
  //   axisLevelState.valueOrder.map((value, valueIndex) => {
  //     let position = {
  //       top: this.titleState.position
  //     }
  //     let labelState = {
  //       position: new Position()
  //     }
  //   })

  //   if (childrenAxisLevels.length) {
  //     // There are more axis levels 

  //   }
  // }
    
  // /**
  //  * 
  //  * @param {Position} parentPosition the parent cell position
  //  * @param {Object} axisLevelState the axis level data state
  //  * @param {String} mainAxisPositionKey the main axis position key. Can be 'width' or 'height'
  //  * @param {String} crossAxisPositionKey the cross axis position key. Can be 'width' or 'height'
  //  */
  // _getAxisCellPosition (parentPosition, axisLevelState, mainAxisPositionKey, crossAxisPositionKey) {
  //   // Position is from top left corner
  //   let position = {
  //     top: parentPosition.top,
  //     left: parentPosition.left
  //   }
  //   // The main axis dimension is the same to parent position
  //   position[mainAxisPositionKey] = parentPosition[mainAxisPositionKey]
  //   // The cross axis dimension is depend on the level size
  //   position[crossAxisPositionKey] = axisLevelState.levelSize
  // }
}