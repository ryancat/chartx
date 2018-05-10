import produce from 'immer'

const defaultState = {
  position: 'bottom',
  width: 400,
  height: 50,
  colorData: [],
  palette: 'default'
}

export default (state = defaultState, action) => {
  switch (action.type) {

    default:
      return state
  }
}