import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT, CHART_LAYOUT_UPDATE } from '../actions/chartAction'
import aspectType from '../enums/aspectType'
import _axisReducerUtil from './_axisReducerUtil'

const defaultState = {
  title: 'Y axis',
  values: [],
  valueOrder: null,
  min: null,
  max: null,
  tickCount: 0,
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
        aspect: _.find(action.chartConfig.aspects, { aspect: aspectType.Y }),
        aspectType: aspectType.Y
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