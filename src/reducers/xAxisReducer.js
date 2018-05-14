import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT, CHART_LAYOUT_UPDATE } from '../actions/chartAction'
import aspectTypeE from '../enums/aspectType'
import locationTypeE from '../enums/locationType'
import _axisReducerUtil from './_axisReducerUtil'

const defaultState = {
  zoom: 1,
  includeZero: true,
  isHidden: false
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      return _axisReducerUtil.chartInit(state, {
        aspects: action.chartConfig.aspects,
        chartWidth: action.chartConfig.width,
        chartHeight: action.chartConfig.height,
        aspectType: aspectTypeE.X
      })

    case CHART_LAYOUT_UPDATE:
      // We need to calculate the chart component dimensions
      // to prepare for rendering
      return produce(state, (draftState) => {
        draftState.width = action.chartDimensions.chartWidth - action.chartDimensions.yAxisWidth
      })

    default:
      return state
  }
}