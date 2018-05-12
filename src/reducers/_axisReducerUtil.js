import produce from 'immer'
import _ from 'lodash'

import dataTypeE from '../enums/dataType'
import aspectTypeE from '../enums/aspectType'
import theme from '../theme'

export default {
  chartInit: (state, action) => {
    return produce(state, (draftState) => {
      const aspectType = action.aspectType,
            aspect = action.aspect
      
      if (!aspect) {
        // Do not have x aspect in chart config
        // hide the default axis in this case
        draftState.isHidden = true
        throw new Error(`No ${aspectType} aspect configured`)
        return
      }

      // Set title
      draftState.title = aspect.title

      // Set values and value order
      draftState.values = aspect.values
      if (aspect.valueOrder) {
        // Only categorical dimensions have value order
        draftState.valueOrder = aspect.valueOrder
      }

      // Agregate aspect values
      switch(aspect.dataType) {
        case dataTypeE.NUMBER:
          draftState.min = _.min(aspect.values)
          draftState.max = _.max(aspect.values)

          if (draftState.includeZero) {
            // Need to consider zero
            draftState.min = Math.min(draftState.min, 0)
            draftState.max = Math.max(0, draftState.max)
          }
          break

        default:
          throw new Error(`Unexpected data type on ${aspectType} aspect: ${aspect.dataType}`)
      }

      // Calculate dimension information
      const axisTheme = theme.axis,
            axisSize = axisTheme.title.fontSize + axisTheme.label.fontSize + axisTheme.extraSpace

      switch (aspectType) {
        case aspectTypeE.X:
          draftState.height = axisSize
          break
        
        case aspectTypeE.Y:
          draftState.width = axisSize
          break

        default:
        throw new Error(`Unexpected aspect type: ${aspect.dataType}`)
      }
    })
  }
}