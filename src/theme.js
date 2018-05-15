import unitType from './enums/unitType'

let axis = {
  extraSpace: 10
}
axis[unitType.TITLE] = {
  fontFamily: 'sans-serif',
  fontSize: 14,
  fontWeight: 'bold'
}
axis[unitType.LABEL] = {
  fontFamily: 'Sans-serif',
  fontSize: 12,
  fontWeight: 'normal'
}
axis[unitType.MARK] = {
  minSize: 10
}

export default {
  axis
}