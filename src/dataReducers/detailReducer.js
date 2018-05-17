import produce from 'immer'
import _ from 'lodash'

import { CHART_INIT } from '../actions/chartAction'
import aspectTypeE from '../enums/aspectType'
import dataTypeE from '../enums/dataType'
import _axisReducerUtil from './_axisReducerUtil'

const defaultState = {
  zoom: 1,
  aspectsMap: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHART_INIT:
      const allAspects = action.chartConfig.aspects,
            detailAspectsMap = _.groupBy(_.differenceBy(allAspects, [{
              aspect: aspectTypeE.X
            }, {
              aspect: aspectTypeE.Y
            }], 'aspect'), 'aspect')

      return _axisReducerUtil.chartInit(state, detailAspectsMap)

    
      // return _axisReducerUtil.chartInit(state, {
      //   aspects: action.chartConfig.aspects,
      //   aspectType: aspectTypeE.Y
      // })

      // const allAspects = action.chartConfig.aspects,
      //       detailAspects = _.differenceBy(allAspects, [{
      //         aspect: aspectTypeE.X
      //       }, {
      //         aspect: aspectTypeE.Y
      //       }], 'aspect')
      // return _axisReducerUtil.chartInit(
      //   state, detailAspects)


      // return produce(state, (draftState) => {
      //   const detailAspects = _.differenceBy(action.chartConfig.aspects, [{
      //     aspect: aspectTypeE.X
      //   }, {
      //     aspect: aspectTypeE.Y
      //   }], 'aspect')

      //   draftState.aspects = detailAspects.map((aspect) => ({
      //     title: aspect.title,
      //     values: aspect.values,
      //     valueOrder: aspect.valueOrder || null,
      //     min: aspect.dataType === dataTypeE.NUMBER ? _.min(aspect.values) : null,
      //     max: aspect.dataType === dataTypeE.NUMBER ? _.max(aspect.values) : null
      //   }))
      // })
      
    default:
      return state
  }
}