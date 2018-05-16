import produce from 'immer'
import { STORE_UPDATE } from '../actions/storeAction';

const defaultState = {
  // The global mark units. In the future this should be further
  // break down to show mark in different areas
  markUnits: [],
  width: 0,
  height: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case STORE_UPDATE:
      return produce(state, (draftState) => {
        draftState.width = action.store.chart.width
        draftState.height = action.store.chart.height
      })

    default:
      return state
  }
}