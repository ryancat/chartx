import produce from 'immer'
import _ from 'lodash'
import uuidv1 from 'uuid/v1'

import dataTypeE from '../enums/dataType'
import aspectTypeE from '../enums/aspectType'
import theme from '../theme'

export default {
  chartInit: (state, action) => {
    return produce(state, (draftState) => {
      const aspectType = action.aspectType,
            aspects = action.aspects
      
      if (!aspects) {
        // Do not have x aspect in chart config
        // hide the default axis in this case
        draftState.isHidden = true
        throw new Error(`No ${aspectType} aspect configured`)
        return
      }

      // Set levels of data on this axis, depend on the aspects level
      const axisTheme = theme.axis
      let axisLevels = [],
          axisSize = 0
      aspects.map((aspect) => {
        let aspectState = {
          id: uuidv1(),
          title: aspect.title,
          dataType: aspect.dataType,
          values: aspect.values,
          // Only categorical dimensions have value order
          valueOrder: aspect.valueOrder || null
        }

        if (aspect.dataType === dataTypeE.NUMBER) {
          // Agregate aspect values when they are number type
          aspectState.min = _.min(aspect.values)
          aspectState.max = _.max(aspect.values)

          if (aspectState.includeZero) {
            // Need to consider zero
            aspectState.min = Math.min(aspectState.min, 0)
            aspectState.max = Math.max(0, aspectState.max)
          }
        }
        else {
          if (typeof aspectState.values[0] !== 'number') {
            // When the values are not numbers, assume them are
            // real values. In this case we will convert values
            // to index to valueOrder for performance purpose
            // 
            // TODO: Even better if we could use bit values
            aspectState.values = aspectState.values.map((value) => aspectState.valueOrder.indexOf(value))
          }
        }

        // Calculate axis level size
        aspectState.titleSize = axisTheme.title.fontSize
        aspectState.labelSize = axisTheme.label.fontSize
        aspectState.levelSize = aspectState.titleSize + aspectState.labelSize + axisTheme.extraSpace
        axisSize += aspectState.levelSize

        axisLevels.push(aspectState)
      })
      draftState.axisLevels = axisLevels

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