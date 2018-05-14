import uuidv1 from 'uuid/v1'

import aspectTypeE from '../enums/aspectType'
import locationTypeE from '../enums/locationType'
import theme from '../theme'
import util from '../util'

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

    // From props
    this.levelState = props.levelState
    this.valueIndexes = props.valueIndexes
    this.markSize = props.markSize
    this.position = props.position
  }

  /**
   * Create tree by converting an level state array
   * @example 
   * // returns tree like this:
   * 'Title 1, A, B'
   * 'Title 2, a, b'; 'Title 2, b, c'
   * 'Title 3, 1, 2'; 'Title 3, 3'; 'Title 3, 2'; 'Title 3, 4'
   * new Tree([
   *   { title: 'Title 1', values: ['A', 'A', 'A', 'B', 'B'] },
   *   { title: 'Title 2', values: ['a', 'a', 'b', 'b', 'c'] },
   *   { title: 'Title 3', values: ['1', '2', '3', '2', '4'] }
   * ])
   * 
   * @example
   * // returns tree like this:
   * 'Title 1, A, B'
   * 'Title 2, a, b'; 'Title 2, b, c'
   * 'Title 3, 110'; 'Title 3, 312'; 'Title 3, 201'; 'Title 3, -20'
   * new Tree([
   *   { title: 'Title 1', values: ['A', 'A', 'B', 'B'] },
   *   { title: 'Title 2', values: ['a', 'b', 'b', 'c'] },
   *   { title: 'Title 3', values: [110, 312, 201, -20] }
   * ])
   * 
   * @param {Array} levelStates array of data in each tree level that can be convert to a tree
   */
  static buildTree (props = {}, rootCell = null) {
    const {
      levelStates = [],
      axisRenderState,
      level = 0
    } = props

    if (!levelStates[level]) {
      // Nothing to build
      return rootCell
    }

    const levelState = levelStates[level],
          locationType = levelState.locationType

    let axisCellMapByLevel = axisRenderState.location[locationType].axisCellMapByLevel
    if (!rootCell) {
      let valueIndexes,
          indexMap
      if (axisRenderState.markSize === theme.axis.mark.minSize) {
        // We need to crop marks here as the calculated markSize is too small
        indexMap = util.getFirstNValuesIndexMap(
          levelState.values, Math.floor(axisRenderState.mainAxisSize / axisRenderState.markSize))
        valueIndexes = _.flatten(Object.values(indexMap))
      }
      else {
        valueIndexes = levelState.values.map((value, valueIndex) => valueIndex)
      }

      // No root node defined. This is will be the global root node
      rootCell = new AxisCell({
        levelState,
        // TODO: try simplify this with bitwise operation
        valueIndexes,
        position: AxisCell.getAxisCellPosition(rootCell, levelState, axisRenderState),
        markSize: axisRenderState.markSize
      })

      axisCellMapByLevel[level] = axisCellMapByLevel[level] || []
      axisCellMapByLevel[level].push(rootCell)

      return this.buildTree({
        levelStates,
        level: level + 1,
        axisRenderState
      }, rootCell)
    }

    // Pass down rootCell, we need to categorize current level state based on
    // rootCell's valueIndexes

    // 1. Category root node values based on the bitwiseFilter and values data
    // TODO: find a way to do this using ArrayBuffer
    // const bitwiseIndexMap = util.getBitwiseIndexMapWithBitwiseFilter(rootCell.levelState.values, rootCell.bitwiseFilter)
    const indexMap = util.getIndexMapWithFilter(rootCell.levelState.values, rootCell.valueIndexes)

    // 2. Create child tree node based on categories
    for (let indexKey in indexMap) {
      // For each of the index category, we create a child node
      let childNode = new AxisCell({
        levelState,
        valueIndexes: indexMap[indexKey],
        position: AxisCell.getAxisCellPosition(rootCell, levelState, axisRenderState),
        markSize: axisRenderState.markSize
      })

      axisCellMapByLevel[level] = axisCellMapByLevel[level] || []
      axisCellMapByLevel[level].push(childNode)

      // This will run DFS algorithm to build tree
      rootCell.addChild(this.buildTree({
        levelStates,
        level: level + 1,
        axisRenderState
      }, childNode))
      // rootCell.valueIndexes.map((filteredIndex) => levelStates[0].values[filteredIndex]),
    }

    return rootCell
  }

  /**
   * Calculate the cell position offset based on parent top left position
   * @param {AxisCell} parentAxisCell the parent axis cell to get children information for offset
   * @param {Object} levelState the axis cell level state
   * @param {Object} axisRenderState axis render state
   */
  static getAxisCellPosition (parentAxisCell, levelState, axisRenderState) {
    const locationType = levelState.locationType
    let axisCellPosition,
        addedChildrenLeavesCount = parentAxisCell ? 
          _.sum(parentAxisCell.children.map((child) => child.valueIndexes.length))
          : 0,
        addedChildrenSize = axisRenderState.markSize * (addedChildrenLeavesCount + 1),
        axisAtLocation = axisRenderState.location[locationType],
        axisPosition = axisAtLocation.position,
        axisLevelCount = Object.keys(axisAtLocation.axisCellMapByLevel).length

    switch(locationType) {
      case locationTypeE.BOTTOM:
        axisCellPosition = {
          top: axisPosition.top + axisPosition.height - levelState.levelSize * (axisLevelCount + 1),
          left: axisPosition.left + addedChildrenSize
        }
        break

      case locationTypeE.TOP:
        axisCellPosition = {
          top: levelState.levelSize * axisLevelCount,
          left: axisPosition.left + addedChildrenSize
        }
        break
        
      case locationTypeE.LEFT:
        axisCellPosition = {
          top: axisPosition.top + addedChildrenSize,
          left: levelState.levelSize * axisLevelCount
        }
        break

      case locationTypeE.RIGHT:
        axisCellPosition = {
          top: axisPosition.top + addedChildrenSize,
          left: axisPosition.left + axisPosition.width - levelState.levelSize * (axisLevelCount + 1)
        }
        break

      default:
        throw new Error('Missing location type information for axis cell')
    }

    return axisCellPosition
  }

  /**
   * Add children axis cell
   * @param {AxisCell} axisCell add one axis cell into children
   */
  addChild (axisCell) {
    this.children.push(axisCell)
  }

  // /**
  //  * Update axis cell position
  //  */
  // updateCellPosition () {
  //   switch(this.locationType) {
  //     case locationTypeE.TOP:
  //     case locationTypeE.LEFT:
  //       this._updateCellPositionFromTopLeft()
  //       break

  //     case locationTypeE.BOTTOM:
  //     case locationTypeE.RIGHT:
  //       this._updateCellPositionFromBottomRight()
  //   }
  // }

  // _updateCellPositionFromTopLeft () {
  //   // For x and y axis, their main/cross dimension are different
  //   const mainAxisPositionKey = aspectType === aspectTypeE.X ? 'width' : aspectType === aspectTypeE.Y ? 'height' : null,
  //         crossAxisPositionKey = aspectType === aspectTypeE.X ? 'height' : aspectType === aspectTypeE.Y ? 'width' : null

  //   // Calculate position
  //   // Position is from top left corner
  //   let position = {
  //     top: this.parentPosition.top,
  //     left: this.parentPosition.left
  //   }
  //   // The main axis dimension is the same to parent position
  //   position[mainAxisPositionKey] = this.parentPosition[mainAxisPositionKey]
  //   // The cross axis dimension is depend on the level size
  //   position[crossAxisPositionKey] = this.levelState.levelSize
  //   this.position = new Position(position)
    
  //   // Calculate title position
  //   // Title differs from cell only at cross axis dimension
  //   position[crossAxisPositionKey] = this.levelState.titleSize
  //   this.titleState = {
  //     position: new Position(position),
  //     displayValue: this.levelState.title
  //   }

  //   // Calculate label positions
  //   // Labels are for each value in this aspect 
  //   let labelStates = []
  //   this.levelState.valueOrder.map((value, valueIndex) => {
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