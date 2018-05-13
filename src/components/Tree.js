import uuidv1 from 'uuid/v1'

import util from '../util'

/**
 * Defines a node in tree data structure
 */
class TreeNode {
  /**
   * Create a tree node with multiple children
   * @param {Object} [props={}] tree properties
   * @param {String} [id=uuidv1()] unique tree node id
   */
  constructor (props = {}, id = uuidv1()) {
    this._id = id
    Object.assign(this, props)

    if (!this.children) {
      this.children = []
    }
  }
}

/**
 * The tree class converts an array of data into two parts.
 * The first part is a hash map which maps tree node id to the actual node
 * and the second part is a tree of tree node id. 
 * This way we can fast access the tree node (O1), and minimize the
 * space complexity by not repeatly store tree nodes
 */
export default class Tree {
  /**
   * Create tree by converting an array
   * @example 
   * // returns tree like this:
   * 'Title 1, A, B'
   * 'Title 2, a, b'; 'Title 2, b, c'
   * 'Title 3, 1, 2'; 'Title 3, 3'; 'Title 3, 2'; 'Title 3, 4'
   * 
   * // Root
   * new Tree([
   *   { title: 'Title 1', values: ['A', 'A', 'A', 'B', 'B'] },
   *   { title: 'Title 2', values: ['a', 'a', 'b', 'b', 'c'] },
   *   { title: 'Title 3', values: ['1', '2', '3', '2', '4'] }
   * ])
   * 
   * @param {Array} levelStates array of data in each tree level that can be convert to a tree
   */
  constructor (levelStates = []) {
    this.rootNode = this.buildTree(levelStates)
  }

  buildTree (levelStates = [], rootNode) {
    if (levelStates.length === 0) {
      // Nothing to build
      return rootNode
    }

    if (!rootNode) {
      rootNode = new TreeNode({
        levelState: levelStates[0],
        // filter the values with bit operation
        // 1101 means filter indexes 0, 1 and 3 
        // bitwiseFilter: Math.pow(2, levelStates[0].values.length) - 1
        indexFilter: levelStates[0].values.map((value, valueIndex) => valueIndex)
      })

      return this.buildTree(levelStates.slice(1), rootNode)
    }

    // 1. Category root node based on the bitwiseFilter and values data
    // TODO: find a way to do this using ArrayBuffer
    // const bitwiseIndexMap = util.getBitwiseIndexMapWithBitwiseFilter(rootNode.levelState.values, rootNode.bitwiseFilter)
    const indexMap = util.getIndexMapWithFilter(rootNode.levelState.values, rootNode.indexFilter)

    // 2. Create child tree node based on categories
    for (let indexKey in indexMap) {
      // For each of the index category, we create a child node
      let childNode = new TreeNode({
        levelState: levelStates[0],
        indexFilter: indexMap[indexKey]
      })
      rootNode.children.push(this.buildTree(levelStates.slice(1), childNode))
      // rootNode.indexFilter.map((filteredIndex) => levelStates[0].values[filteredIndex]),
    }

    return rootNode
  }
}