import produce from 'immer'

const defaultState = {
  title: 'X axis',
  min: 0,
  max: 100,
  height: 40,
  width: 400,
  zoom: 1,
  includeZero: true,
  isHidden: false
}

export default (state = defaultState, action) => {
  switch (action.type) {

    default:
      return state
  }
}