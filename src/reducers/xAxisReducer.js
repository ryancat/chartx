import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT } from '../actions/chartAction'
import aspectType from '../enums/aspectType'
import _axisReducerUtil from './_axisReducerUtil'

const defaultState = {
  title: 'X axis',
  min: null,
  max: null,
  tickCount: 0,
  zoom: 1,
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

    default:
      return state
  }
}