import produce from 'immer'
import _ from 'lodash'
import uuidv1 from 'uuid/v1'

import dataTypeE from '../enums/dataType'
import aspectTypeE from '../enums/aspectType'
import theme from '../theme'

const axisReducerUtil = {
  chartInit: (state, aspectMap) => {
    return produce(state, (draftState) => {
      for (let aspectType in aspectMap) {
        axisReducerUtil._initAspect(draftState, aspectType, aspectMap[aspectType])
      }
    })
  },

  _initAspect: (draftState, aspectType, aspects) => {
    const axisTheme = theme.axis,
          titleSize = axisTheme.title.fontSize,
          labelSize = axisTheme.label.fontSize,
          levelSize = titleSize + labelSize + axisTheme.extraSpace
          
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
        // if (store.includeZero) {
        //   // Need to consider zero
        //   aspectState.min = Math.min(aspectState.min, 0)
        //   aspectState.max = Math.max(0, aspectState.max)
        // }
        aspectState.includeZero = !!aspect.includeZero
      }
      else {
        // When the values are not numbers, assume them are
        // real values. In this case we will convert values
        // to index to valueOrder for performance purpose
        // 
        // TODO: Even better if we could use bit values
        aspectState.values = aspectState.values.map((value) => aspectState.valueOrder.indexOf(value))
      }

      // Calculate axis level size
      if (aspectType === aspectTypeE.X || aspectType === aspectTypeE.Y) {
        aspectState.titleSize = titleSize
        aspectState.labelSize = labelSize
        aspectState.levelSize = levelSize
      }
      
      axisLevels.push(aspectState)
    })

    draftState.aspectsMap[aspectType] = axisLevels
  }
}

export default axisReducerUtil