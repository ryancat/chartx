import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT, CHART_LAYOUT_UPDATE } from '../actions/chartAction'
import aspectTypeE from '../enums/aspectType'
import locationTypeE from '../enums/locationType'
import _axisReducerUtil from './_axisReducerUtil'

const defaultState = {
  zoom: 1,
  isHidden: false,
  aspectsMap: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHART_INIT:
    const allAspects = action.chartConfig.aspects
    let aspectMap = {}
    aspectMap[aspectTypeE.Y] = _.filter(allAspects, { aspect: aspectTypeE.Y })
    return _axisReducerUtil.chartInit(state, aspectMap)

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