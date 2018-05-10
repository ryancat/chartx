# chartx

## In a nut shell
chartx is a charting library that aims big data scale and good performance. There are two main parts in the charting library, one is chart state management, another is rendering. For the former, it borrows the concept from [Redux](https://github.com/reactjs/redux) by using a single store for all chart states, and using reducers to update them. This makes sure the chart behaves like a finite state machine and everything is able to undo/redo. For the latter, chartx provides high performance rendering with planning to support multiple renderer, including HTML5 canvas, SVG as well as WebGL. The idea behind chartx was inspired by my experiences with Redux as well as the rendering engine we built at Workday.

## More details
When render starts, chartx will kick off a loop based on requestAnimationFrame and use a [time based animation](http://blog.sklambert.com/using-time-based-animation-implement/) to keep the two main parts running: **update** and **render**. The update functions will be called whenever something changed in chart state resulted by reducer functions. With that a new final render state will be created. The render functions, on the other hand, will be called in each frame to trigger rendering work based on the current chart state and current render state, as well as the final render states.

## Todo list
- Finish bar chart