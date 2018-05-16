import produce from 'immer'
import locationTypeE from '../enums/locationType'

const defaultState = {
  locationType: locationTypeE.bottom
}

export default (state = defaultState, action) => {
  switch (action.type) {

    // case CHART_INIT:
    //   return _axisReducerUtil.chartInit(state, {
    //     aspects: action.chartConfig.aspects,
    //     chartWidth: action.chartConfig.width,
    //     chartHeight: action.chartConfig.height,
    //     aspectType: aspectTypeE.X
    //   })

    // case CHART_LAYOUT_UPDATE:
    //   // We need to calculate the chart component dimensions
    //   // to prepare for rendering
    //   return produce(state, (draftState) => {
    //     draftState.width = action.chartDimensions.chartWidth - action.chartDimensions.yAxisWidth
    //   })

    default:
      return state
  }
}