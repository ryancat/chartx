import produce from 'immer'

const defaultState = {
  title: 'Y axis',
  min: 0,
  max: 100,
  height: 400,
  width: 40,
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