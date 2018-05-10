import produce from 'immer'

import markType from '../enums/markType'

const defaultState = {
  // panes: [
  //   {
  //     type: 'dot',
  //     marks: [{
  //       data: {
  //         x: 'Vans',
  //         y: 100,
  //         color: 'Male'
  //       },
  //       isSelected: false,
  //       isHover: false
  //     }, {
  //       data: {
  //         x: 'Adidas',
  //         y: 30,
  //         color: 'Male'
  //       },
  //       isSelected: false,
  //       isHover: false
  //     }, {
  //       data: {
  //         x: 'Nike',
  //         y: 10,
  //         color: 'Male'
  //       },
  //       isSelected: false,
  //       isHover: false
  //     }]
  //   }, {
  //     type: 'bar',
  //     marks: [{
  //       data: {
  //         x: 'Vans',
  //         y: 30,
  //         color: 'Female'
  //       },
  //       isSelected: false,
  //       isHover: false
  //     }, {
  //       data: {
  //         x: 'Adidas',
  //         y: 103,
  //         color: 'Female'
  //       },
  //       isSelected: false,
  //       isHover: false
  //     }, {
  //       data: {
  //         x: 'Nike',
  //         y: 150,
  //         color: 'Female'
  //       },
  //       isSelected: false,
  //       isHover: false
  //     }]
  //   }
  // ]

  panes: []
}

export default (state = defaultState, action) => {
  switch (action.type) {

    default:
      return state
  }
}