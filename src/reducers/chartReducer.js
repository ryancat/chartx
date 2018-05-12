import produce from 'immer'
import { CHART_INIT } from '../actions/chartAction'
import rendererTypeE from '../enums/rendererType'

const defaultState = {
  title: 'A Chartx Example',
  width: 400,
  height: 400,
  rendererType: rendererTypeE.CANVAS
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      return produce(state, (draftState) => {
        draftState.title = action.chartConfig.title
        draftState.width = action.chartConfig.width
        draftState.height = action.chartConfig.height
        draftState.rendererType = action.chartConfig.rendererType
      })

    default:
      return state
  }
}