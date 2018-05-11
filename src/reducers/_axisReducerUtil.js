import produce from 'immer'
import _ from 'lodash'

import dataType from '../enums/dataType'

export default {
  chartInit: (state, action) => {
    return produce(state, (draftState) => {
      const aspectType = action.aspectType,
            aspect = action.aspect
      
      if (!aspect) {
        // Do not have x aspect in chart config
        // hide the default axis in this case
        draftState.isHidden = true
        console.warn(`No ${aspectType} aspect configured`)
        return
      }

      // Set title
      draftState.title = aspect.title

      // Agregate aspect values
      switch(aspect.dataType) {
        case dataType.STRING:
          draftState.tickCount = aspect.valueOrder.length
          break

        case dataType.NUMBER:
          draftState.min = _.min(aspect.values)
          draftState.max = _.max(aspect.values)

          if (draftState.includeZero) {
            // Need to consider zero
            draftState.min = Math.min(draftState.min, 0)
            draftState.max = Math.max(0, draftState.max)
          }
          break

        default:
          console.warn(`Unexpected data type on ${aspectType} aspect`, aspect.dataType)
      }
    })
  }
}