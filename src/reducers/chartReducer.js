import produce from 'immer'
import { CHART_INIT, CHART_LAYOUT_UPDATE } from '../actions/chartAction'

const defaultState = {
  title: 'A Chartx Example',
  width: 400,
  height: 400,
  xAxisSize: {
    width: 360,
    height: 40
  },
  yAxisSize: {
    width: 40,
    height: 360
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      return produce(state, (draftState) => {
        draftState.title = action.chartConfig.title
      })

    case CHART_LAYOUT_UPDATE:
      console.log('CHART_LAYOUT_UPDATE', state, action)
      // We need to calculate the chart component dimensions
      // to prepare for rendering
      return produce(state, (draftState) => {

      })

    default:
      return state
  }
}