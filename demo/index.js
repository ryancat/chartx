import chartx from '../src/chartx'
import scatterChart from './scatterChart'
import heatMapChart from './heatMapChart'

const demoContainer = document.getElementById('root')

// Insert chart into container
async function insertChart (chartConfig) {
  const chart = await chartx.createChart(chartConfig)
  demoContainer.appendChild(chart.element)
}

// insertChart(heatMapChart)
insertChart(scatterChart)