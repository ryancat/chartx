import AxisCell from './AxisCell'
import util from '../util'

/**
 * Define axis header class
 * The axis header contains a tree structure of axis cells.
 * Each axis cell is a combination of title and labels.
 * 
 * It also contains a map of axis cells for fast access.
 */
export default class AxisHeader {
  constructor (props) {
    this.position = props.position

    this.rootAxisCell = this.buildTree(props.axisLevels)
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
  buildTree (levelStates = [], rootCell = null) {
    if (levelStates.length === 0) {
      // Nothing to build
      return rootCell
    }

    const levelState = levelStates[0]

    if (!rootCell) {
      // No root node defined. This is will be the global root node
      rootCell = new AxisCell({
        levelState,
        // filter the values with bit operation
        // 1101 means filter indexes 0, 1 and 3 
        // bitwiseFilter: Math.pow(2, levelState.values.length) - 1

        // The global root cell has all values in current level
        cellValueIndexes: levelState.values.map((value, valueIndex) => valueIndex)
      })

      return this.buildTree(levelStates.slice(1), rootCell)
    }

    // Pass down rootCell, we need to categorize current level state based on
    // rootCell's cellValueIndexes

    // 1. Category root node values based on the bitwiseFilter and values data
    // TODO: find a way to do this using ArrayBuffer
    // const bitwiseIndexMap = util.getBitwiseIndexMapWithBitwiseFilter(rootCell.levelState.values, rootCell.bitwiseFilter)
    const indexMap = util.getIndexMapWithFilter(rootCell.levelState.values, rootCell.cellValueIndexes)

    // 2. Create child tree node based on categories
    for (let indexKey in indexMap) {
      // For each of the index category, we create a child node
      let childNode = new AxisCell({
        levelState,
        cellValueIndexes: indexMap[indexKey]
      })

      // This will run DFS algorithm to build tree
      rootCell.addChild(this.buildTree(levelStates.slice(1), childNode))
      // rootCell.cellValueIndexes.map((filteredIndex) => levelStates[0].values[filteredIndex]),
    }

    return rootCell
  }
}




// class AxisCell {
//   /**
//    * Create axis cell (in tree data structure) for renderers based on axisLevelStates
//    * @param {Object} axisLevelStates the axis level states to render axis
//    * @param {Position} parentPosition position for this axis cell
//    * @param {Enum.aspcetType} aspectType the given axis aspect
//    * @param {Enum.locationType} locationType the given axis aspect
//    */
//   constructor (axisLevelStates, parentPosition, aspectType, locationType) {
//     if (aspectType !== aspectTypeE.X || aspectType !== aspectTypeE.Y) {
//       // Axis cell are only for axis. Currently only X and Y axes are supported
//       throw new Error(`Unexpected aspect type for axis: ${aspectType}`)
//     }

//     // Default location types
//     if (!locationType) {
//       if (aspectType === aspectTypeE.X) {
//         // For x axis, default location is at bottom
//         locationType = locationTypeE.BOTTOM
//       }
//       else if (aspectType === aspectTypeE.Y) {
//         // For y axis, default location is at left
//         locationType = locationTypeE.LEFT
//       }
//     }
    
//     // Axis cell is tree structure
//     this.children = []
//     this.buildAxisCell(axisLevelStates, parentPosition, aspectType, locationType)
//   }

//   buildAxisCell (axisLevelStates, parentPosition, aspectType, locationType) {
//     switch (locationType) {
//       case locationTypeE.TOP:
//       case locationTypeE.LEFT:
//         this.buildAxisCellFromTopLeft(axisLevelStates, parentPosition, aspectType)
//         break

//       case locationTypeE.BOTTOM:
//       case locationTypeE.RIGHT:
//         this.buildAxisCellFromBottomRight(axisLevelStates, parentPosition, aspectType)
//     }
//   }

//   buildAxisCellFromTopLeft (axisLevelStates = [], aspectType, ) {
//     // For x and y axis, their main/cross dimension are different
//     const axisLevelState = axisLevelStates[0],
//           childrenAxisLevels = axisLevelStates.slice(1),
//           mainAxisPositionKey = aspectType === aspectTypeE.X ? 'width' : aspectType === aspectTypeE.Y ? 'height' : null,
//           crossAxisPositionKey = aspectType === aspectTypeE.X ? 'height' : aspectType === aspectTypeE.Y ? 'width' : null

//     if (!axisLevel) {
//       // No axis level state to build
//       return
//     }

//     // Calculate position
//     // Position is from top left corner
//     let position = {
//       top: parentPosition.top,
//       left: parentPosition.left
//     }
//     // The main axis dimension is the same to parent position
//     position[mainAxisPositionKey] = parentPosition[mainAxisPositionKey]
//     // The cross axis dimension is depend on the level size
//     position[crossAxisPositionKey] = axisLevelState.levelSize
//     this.position = new Position(position)
    
//     // Calculate title position
//     // Title differs from cell only at cross axis dimension
//     position[crossAxisPositionKey] = axisLevelState.titleSize
//     this.titleState = {
//       position: new Position(position),
//       displayValue: axisLevelState.title
//     }

//     // Calculate label positions
//     // Labels are for each value in this aspect 
//     let labelStates = []
//     axisLevelState.valueOrder.map((value, valueIndex) => {
//       let position = {
//         top: this.titleState.position
//       }
//       let labelState = {
//         position: new Position()
//       }
//     })

//     if (childrenAxisLevels.length) {
//       // There are more axis levels 

//     }
//   }


//   // /**
//   //  * 
//   //  * @param {Position} parentPosition the parent cell position
//   //  * @param {Object} axisLevelState the axis level data state
//   //  * @param {String} mainAxisPositionKey the main axis position key. Can be 'width' or 'height'
//   //  * @param {String} crossAxisPositionKey the cross axis position key. Can be 'width' or 'height'
//   //  */
//   // _getAxisCellPosition (parentPosition, axisLevelState, mainAxisPositionKey, crossAxisPositionKey) {
//   //   // Position is from top left corner
//   //   let position = {
//   //     top: parentPosition.top,
//   //     left: parentPosition.left
//   //   }
//   //   // The main axis dimension is the same to parent position
//   //   position[mainAxisPositionKey] = parentPosition[mainAxisPositionKey]
//   //   // The cross axis dimension is depend on the level size
//   //   position[crossAxisPositionKey] = axisLevelState.levelSize
//   // }

//   // buildAxisCellFromBottomRight () {

//   // }

//   // buildXAxisCell (axisLevelState, parentPosition) {
//   //   this.position = new Position(parentPosition.top + parentPosition.height - )
//   // }
// }