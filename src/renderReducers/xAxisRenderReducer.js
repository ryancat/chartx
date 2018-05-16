import produce from 'immer'
import _ from 'lodash'

import _axisRenderReducerUtil from './_axisRenderReducerUtil'
import aspectTypeE from '../enums/aspectType'
import { STORE_UPDATE } from '../actions/storeAction';

const defaultState = {
  location: {},
  mainAxisSize: null,
  markSize: null,
  rootAxisCell: null,
  leafUnits: []
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case STORE_UPDATE:
      return _axisRenderReducerUtil.storeUpdate(state, {
        aspectType: aspectTypeE.X,
        ...action
      })

    default:
      return state
  }
}