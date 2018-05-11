export const CHART_INIT = 'CHART_INIT'
export const CHART_LAYOUT_UPDATE = 'CHART_LAYOUT_UPDATE'

export const chartInit = (chartId, chartConfig) => ({
  type: CHART_INIT,
  chartId,
  chartConfig
})

export const chartInitFinished = (chartId, dimensionInfo) => ({
  type: CHART_LAYOUT_UPDATE,
  chartId,
  dimensionInfo
})