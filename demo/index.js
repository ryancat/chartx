import scatterChart from './scatterChart'

const demoContainer = document.getElementById('root')

// Insert chart into container
async function insertChart (chart) {
  demoContainer.appendChild((await scatterChart).element)
}

insertChart(scatterChart)