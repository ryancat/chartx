export const CHART_INIT = 'CHART_INIT'

export const chartInit = (chartId, chartConfig) => ({
  type: CHART_INIT,
  chartId,
  chartConfig
})