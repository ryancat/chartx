import produce from 'immer'
import { CHART_INIT } from '../actions/chartAction'

const defaultState = {
  title: 'A Chartx Example',
  width: 400,
  height: 400
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      return produce(state, (draftState) => {
        draftState.title = action.chartConfig.title
        draftState.width = action.chartConfig.width
        draftState.height = action.chartConfig.height
      })

    default:
      return state
  }
}