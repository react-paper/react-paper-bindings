// @flow

export function arePointsEqual(p1: Object, p2: Object) {
  if (p1 && p2) {
    return p1.x === p2.x && p1.y === p2.y
  } else if (!p1 && !p2) {
    // If both are null
    return true
  } else {
    // Only either one is null
    return false
  }
}
