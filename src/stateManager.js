import { Pool, config } from 'threads'
import util from './util'

// Create pool of workers that we are going to queue reducer logic
// Default to the number of CPU cores
config.set({
  basepath: {
    web: 'http://localhost:8080/dist'
  }
})
const pool = new Pool()

/**
 * Create a store which holds chart data state and utils to
 * interact with the state via dispatchers
 * 
 * @param {Function} reducer The (combined) reducer which takes 
 * current state and action then returns new state
 */
export async function createStore (reducer) {
  // Init state come from reducer
  let state = await reducer()

  return {
    // The async reducer map used to add async reducers into store
    // asyncReducerMap: {},
    /**
     * Dispatch action to trigger state changes
     */
    dispatch: async (action = {}) => {
      if (process.env.code === 'DEV') {
        // log actions in console
        console.group(action.type)
        console.info('%cbefore:', 'color: green', state)
        console.info('%caction:', 'color: red', action)
      }
      
      // Update state
      // We cannot assume the reducer function is synchrounous.
      // state update is not done until all reduers finishes their work
      state = await reducer(state, action)

      if (process.env.code === 'DEV') {
        // log actions in console
        console.info('%cafter:', 'color: green', state)
        console.groupEnd()
      }

      // Return the state once it's finish updating
      // TODO: should we return state here? maybe not as this will expose
      // state and it may subject to be modified!
      return state
    },
    // /**
    //  * Replace the reducer for store to a different one
    //  * This is useful when we want to dynamically add reducers
    //  */
    // replaceReducer: (newReducer) => {
    //   reducer = newReducer
    // },
    /**
     * Return the current state for given key
     * This is to allow application to 'connect' to state
     */
    getState: (stateKey) => {
      if (!stateKey) {
        return state
      }
      else {
        return state[stateKey]
      }
    }
  }
}

// /**
//  * Create a reducer based on given reducer map.
//  * By wrapping combineReducer function, we have a chance to dynamically
//  * add new reducers
//  * 
//  * @param {object} reducerMap 
//  */
// export function createReducer (reducerMap = {}) {
//   const reducer = combineReducer(reducerMap)
  
//   return async (state = {}, action = {}) => {
//     await reducer(state, action)
//   }
// }

/**
 * Will combine nested reducer map to a big reducer
 * 
 * Example:
 * combineReducer({
 *   'chart 1': {
 *     data: () => {},
 *     frs: () => {}
 *   },
 *   'chart 2': {
 *     data: () => {},
 *     frs: () => {}
 *   }
 * })
 * 
 * will give a reducer function which nested with
 * combined reducer for chart 1 and chart 2
 * 
 * @param {Object} reducerMap a map of reducer functions 
 */
export function combineReducer (reducerMap = {}) {
  return async (state = {}, action = {}) => {
    let newState = {}

    for (let key in reducerMap) {
      let reducerFn = reducerMap[key],
          childState = state[key]

      if (util.isFunction(reducerFn)) {
        // Compute children state
        newState[key] = await reducerFn(childState, action)
      } 
      else {
        // Recursively combine nested reducer map
        newState[key] = await combineReducer(reducerMap[key])(childState, action)
      }
    }

    return newState
  }
}

export function combineParallelReducer (reducerMap = {}, reducerBundlePrefix = '') {
  return async (state = {}, action = {}) => {
    let newState = {}

    let promiseQueue = []
    for (let key in reducerMap) {
      let reducerFn = reducerMap[key],
          childState = state[key]

      if (util.isFunction(reducerFn)) {
        // Create reducer function bundle to run in child process
        // Compute children state
        console.log('start thread')
        promiseQueue.push(new Promise((resolve, reject) => {
          pool.run((args, done) => {
            // Everything here is in a child process context
            const { state, action, reducerBundleName } = args,
                  reducerFn = self[reducerBundleName].default
            done(reducerFn(state, action))
          }, [`${reducerBundlePrefix + key}.js`])
          .send({ 
            childState, 
            action, 
            reducerBundleName: reducerBundlePrefix + key })
          .on('done', (newReducedState) => {
            resolve(newReducedState)
            console.log('end thread')
          })
          .on('error', (err) => {
            reject(err)
          })
        }))
        // newState[key] = await reducerFn(childState, action)
      } 
      else {
        // Recursively combine nested reducer map
        promiseQueue.push(combineParallelReducer(reducerMap[key], reducerBundlePrefix)(childState, action))
      }
    }
    
    const resolvedStates = (await Promise.all(promiseQueue))
    Object.keys(reducerMap).forEach((key, keyIndex) => {
      newState[key] = resolvedStates[keyIndex]
    })

    return newState
  }
}
