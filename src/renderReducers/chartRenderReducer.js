import produce from 'immer'
import { STORE_UPDATE } from '../actions/storeAction';
import Unit from '../components/Unit'

const defaultState = {
  // The global mark units. In the future this should be further
  // break down to show mark in different areas
  markRecords: [],
  width: 0,
  height: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case STORE_UPDATE:
      return produce(state, (draftState) => {
        const chartState = action.store.chart,
              detailState = action.store.detail

        draftState.width = chartState.width
        draftState.height = chartState.height

        for (let aspectType in detailState.aspectsMap) {
          const aspectStates = detailState.aspectsMap[aspectType]
          for (let aspectState of aspectStates) {
            aspectState.values.forEach((valueIndex, indexOfValueIndex) => {
              draftState.markRecords[indexOfValueIndex] = draftState.markRecords[indexOfValueIndex] || {}

              let content
              if (aspectState.valueOrder) {
                // Categorical data
                // TODO: do not allow multiple same aspect type records!
                // For example, do not allow two colors!
                content = {
                  dataType: aspectState.dataType,
                  value: aspectState.valueOrder[valueIndex]
                }
              }
              else {
                // Quantitative data
                content = {
                  dataType: aspectState.dataType,
                  value: valueIndex
                }
              }
              draftState.markRecords[indexOfValueIndex][aspectType] = new Unit(content)
            })
          }
        }
      })

    default:
      return state
  }
}