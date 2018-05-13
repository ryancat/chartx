import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT, CHART_LAYOUT_UPDATE } from '../actions/chartAction'
import aspectTypeE from '../enums/aspectType'
import _axisReducerUtil from './_axisReducerUtil'

const defaultState = {
  zoom: 1,
  width: 40,
  height: 360,
  includeZero: true,
  isHidden: false
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      return _axisReducerUtil.chartInit(state, {
        aspects: _.filter(action.chartConfig.aspects, { aspect: aspectTypeE.Y }),
        aspectType: aspectTypeE.Y
      })

    case CHART_LAYOUT_UPDATE:
      // We need to calculate the chart component dimensions
      // to prepare for rendering
      return produce(state, (draftState) => {
        draftState.height = action.chartDimensions.chartHeight - action.chartDimensions.xAxisHeight
      })

    default:
      return state
  }
}