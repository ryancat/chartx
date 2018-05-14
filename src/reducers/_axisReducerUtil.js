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
            axisTheme = theme.axis,
            titleSize = axisTheme.title.fontSize,
            labelSize = axisTheme.label.fontSize,
            levelSize = titleSize + labelSize + axisTheme.extraSpace,
            allAspects = action.aspects,
            xAspects = _.filter(allAspects, { aspect: aspectTypeE.X }),
            yAspects = _.filter(allAspects, { aspect: aspectTypeE.Y }),
            aspects = aspectType === aspectTypeE.X ? xAspects 
            : aspectType === aspectTypeE.Y ? yAspects : null
      
      if (!aspects || aspects.length === 0) {
        // Do not have such aspect in chart config
        // hide the default axis in this case
        draftState.isHidden = true
        return
      }

      // Get axis levels array
      let axisLevels = []
      aspects.map((aspect) => {
        let aspectState = {
          id: uuidv1(),
          title: aspect.title,
          dataType: aspect.dataType,
          values: aspect.values,
          // Only categorical dimensions have value order
          valueOrder: aspect.valueOrder || null,
          locationType: aspect.locationType
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
        aspectState.titleSize = titleSize
        aspectState.labelSize = labelSize
        aspectState.levelSize = levelSize

        axisLevels.push(aspectState)
      })
      draftState.axisLevels = axisLevels
    })
  }
}