import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT, CHART_LAYOUT_UPDATE } from '../actions/chartAction'
import aspectType from '../enums/aspectType'
import _axisReducerUtil from './_axisReducerUtil'

const defaultState = {
  title: 'X axis',
  values: [],
  valueOrder: null,
  min: null,
  max: null,
  tickCount: 0,
  zoom: 1,
  width: 360,
  height: 40,
  includeZero: true,
  isHidden: false
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      return _axisReducerUtil.chartInit(state, {
        aspect: _.find(action.chartConfig.aspects, { aspect: aspectType.X }),
        aspectType: aspectType.X
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