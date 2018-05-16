export const STORE_UPDATE = 'STORE_UPDATE'

export function storeUpdate (chartId, store) {
  return {
    type: STORE_UPDATE,
    chartId,
    store
  }
}