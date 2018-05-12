import produce from 'immer'

const defaultCurrentRenderState = {}

export default (currentRenderState = defaultCurrentRenderState, action) => {
  const {
    finalRenderState,
    dt
  } = action

  return produce(currentRenderState, (draftState) => {
    
  })
}