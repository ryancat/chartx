import treeTraverseOrderTypeE from './enums/treeTraverseOrderType'

const util = {
  isFunction: (functionToCheck) => {
    return functionToCheck 
      && Object.prototype.toString.call(functionToCheck) === '[object Function]'
  },

  /**
   * Traverse a tree data structure
   * @param {Object} root root node for the tree structure
   * @param {Enum.treeTraverseOrderType} traverseOrderType traverse tree order type
   * @param {Function} callback callback function for traverse
   */
  treeTraverse (root, traverseOrderType, callback) {
    
  },

  postOrderTraverse (root, callback) {

  },

  /**
   * Categorize the given index array
   * @example
   * // return { '0': [0, 2], '1': [1], '2': [3] }
   * getIndexesByCategory([0, 1, 0, 2])
   * @param {Array} indexArr array of indexes
   */
  getIndexMap: (indexArr = []) => {
    let indexMap = {}

    indexArr.forEach((indexValue, index) => {
      indexMap[indexValue] = indexMap[indexValue] || []
      indexMap[indexValue].push(index)
    })

    return indexMap
  },

  /**
   * Categorize the given index array with filter
   * @example
   * // return { '0': [0, 2], '2': [3] }
   * getIndexesByCategory([0, 1, 0, 2], [0, 2, 3])
   * @param {Array} indexArr array of indexes
   * @param {Array} indexFilter array of indexes that should be considered
   */
  getIndexMapWithFilter: (indexArr = [], indexFilter) => {
    if (!indexFilter) {
      return util.getIndexMap(indexArr)
    }

    let indexMap = {}

    indexFilter.forEach((filteredIndex) => {
      indexMap[indexArr[filteredIndex]] = indexMap[indexArr[filteredIndex]] || []
      indexMap[indexArr[filteredIndex]].push(filteredIndex)
    })

    return indexMap
  },

  /**
   * Categorize the given index array with count limit
   * @example
   * // return { '0': [0, 3], '1': [2] }
   * getIndexesByCategory([0, 2, 1, 0], 3)
   * @param {Array} indexArr array of indexes
   * @param {Array} count the count limit for indexes
   */
  getFirstNValuesIndexMap: (indexArr = [], count = Infinity) => {
    const totalCount = indexArr.length
    let indexMap = util.getIndexMap(indexArr)

    if (count >= totalCount) {
      // When the count limit is greater than total count
      // nothing need to be filtered
      return indexMap
    }

    let addedIndexCount = 0,
        isReachLimit = false
    for (let indexKey in indexMap) {
      if (isReachLimit) {
        delete indexMap[indexKey]
        continue
      }

      let difference = count - (addedIndexCount + indexMap[indexKey].length)
      if (difference <= 0) {
        // We reach the count limit. Crop indexes
        indexMap[indexKey] = indexMap[indexKey].slice(0, count - addedIndexCount)
        isReachLimit = true
      }

      addedIndexCount += indexMap[indexKey].length
    }
    
    return indexMap
  },

  /**
   * Categorize given index array in bitwise format
   * @example
   * // return { '0': 0101, '1': 0010, '2': 1000 }
   * getBitwiseIndex([0, 1, 0, 2])
   */
  getBitwiseIndexMap: (indexArr = []) => {
    let bitwiseIndexMap = {}

    indexArr.forEach((indexValue, index) => {
      bitwiseIndexMap[indexValue] = bitwiseIndexMap[indexValue] || []
      bitwiseIndexMap[indexValue] |= 1 << index
    })

    return bitwiseIndexMap
  },

  /**
   * Categorize given index array in bitwise format with given filter
   * @example
   * // return { '0': 0101, '2': 1000 }
   * getBitwiseIndex([0, 1, 0, 2], 1101)
   */
  getBitwiseIndexMapWithBitwiseFilter: (indexArr = [], bitwiseFilter) => {
    if (typeof bitwiseFilter === 'undefined') {
      return util.getBitwiseIndexMap(indexArr)
    }
    
    let bitwiseIndexMap = {}

    indexArr.forEach((indexValue, index) => {
      // When the filter is not on for this index, do nothing
      if ((1 << index) & bitwiseFilter) {
        bitwiseIndexMap[indexValue] = bitwiseIndexMap[indexValue] || []
        bitwiseIndexMap[indexValue] |= 1 << index
      }
    })

    return bitwiseIndexMap
  }
}

export default util