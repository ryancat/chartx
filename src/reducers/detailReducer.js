import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT } from '../actions/chartAction'
import aspectTypeE from '../enums/aspectType'
import dataTypeE from '../enums/dataType'

const defaultState = {
  aspects: [],
  zoom: 1,
  isHidden: false
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      return produce(state, (draftState) => {
        const detailAspects = _.differenceBy(action.chartConfig.aspects, [{
          aspect: aspectTypeE.X
        }, {
          aspect: aspectTypeE.Y
        }], 'aspect')

        draftState.aspects = detailAspects.map((aspect) => ({
          title: aspect.title,
          values: aspect.values,
          valueOrder: aspect.valueOrder || null,
          min: aspect.dataType === dataTypeE.NUMBER ? _.min(aspect.values) : null,
          max: aspect.dataType === dataTypeE.NUMBER ? _.max(aspect.values) : null
        }))
      })
      
    default:
      return state
  }
}