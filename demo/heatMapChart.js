const {
  dataType,
  aspectType,
  rendererType,
  locationType
} = chartx.enums

// The config required to render a chart
const chartConfig = {
  // Title is used on the top of chart as the chart title
  title: 'Demo chart',
  // Aspects are data and their configuration for each aspect of chart
  aspects: [
    {
      aspect: aspectType.X,
      title: 'Shoes',
      dataType: dataType.STRING,
      values: ['Vans', 'Vans', 'Vans', 'Vans', 'Adidas', 'Adidas', 'Adidas', 'Adidas', 'Nike', 'Nike', 'Nike', 'Nike'],
      valueOrder: ['Vans', 'Adidas', 'Nike'],
      locationType: locationType.BOTTOM
    },
    {
      aspect: aspectType.X,
      title: 'Sex',
      dataType: dataType.STRING,
      values: ['Male', 'Male','Female', 'Female', 'Male', 'Male', 'Female', 'Female', 'Male', 'Male', 'Female', 'Female'],
      valueOrder: ['Male', 'Female'],
      locationType: locationType.TOP
    },
    {
      aspect: aspectType.Y,
      title: 'Store',
      dataType: dataType.STRING,
      values: ['B', 'A', 'C', 'A', 'A', 'B', 'A', 'B', 'A', 'C', 'A', 'C'],
      valueOrder: ['A', 'B', 'C', 'D'],
      locationType: locationType.LEFT
    }
  ],
  // The outer width of chart
  width: 500,
  // The outer height of chart
  height: 500,
  // The renderer to use for rendering API
  // TODO: Need to figure out a way to support different renderer in eacy layer
  rendererType: rendererType.CANVAS,
  // If truthy will show default control panel
  enableDefaultControls: true
}

// /**
//  * The x tick formatter
//  * @param {string} data 
//  */
// function formatXTick (data) {
//   return data
// }

// /**
//  * The y tick formatter
//  * @param {string} data 
//  */
// function formatYTick (data) {
//   return data
// }

// chartx
//   // Spawn a new chart
//   .spawn()
//   .setData(chartData)
//   // When there is no numeric data, we will use default measure to render chart
//   .setDefaultMeasure(chartx.constant.COUNT)
//   // The data on axis will be grouped by the order in given array
//   .setGroupby('x', ['product'])
//   // The size for axis will be applied on all other dimentions. For example, in
//   // this case the size of x is 0, meaning we don't need to render any length on
//   // y or z axis. We want the height of bars to be determined by data only
//   .setSize('x', 0)
//   // Note that the unit for tick is determined by the size of render result on
//   // this axis. In this case, we render size of y as 1 unit (which is the interval
//   // of x ticks), hence 0.5 will be the middle of bars (default). The optional 
//   // formatXTick function is used to format the tick value
//   .setTick('x', 0.5, formatXTick)
//   .setGroupby('y', ['amount'])
//   // Note that the unit for size is determined by the size of tick intervals on
//   // other axis. In this case, if the total length of x axis is 100px, and there
//   // are 10 ticks, then the unit length is 10px for y axis.
//   .setSize('y', 1)
//   .setTick('y', 1, formatYTick)
//   .setContainer(chartContainer)
//   .setTheme({
//     fontSize: '16px',
//     background: '#ccc'
//   })
//   .set

// chartx.spawn()

// // Directly render a basic bar chart, with optional settings
// chartx.render({
//   container: chartContainer,
//   data: chartData,
//   chartType: 'bar',
//   aspect: {
//     x: ['product'],
//     y: ['amount']
//   },
//   theme: {
//     fontSize: '16px',
//     background: '#ccc'
//   },
//   watch: true
// })

// Render a custom bar chart

export default chartConfig