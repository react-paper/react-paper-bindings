export const COLORS = [
  'green','greenyellow','orange','brown','gold','fuchsia','syan','chartreuse',
  'violet','purple','yellow','red','blue','grey','pink','magenta','orangered',
  'cyan',
]

export function getEventXY(e) {
  return {
    x: (e.touches) ? e.touches[0].pageX : e.pageX,
    y: (e.touches) ? e.touches[0].pageY : e.pageY,
  }
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min
}

export function getRandomColor() {
  return COLORS[getRandomInt(0,COLORS.length-1)]
}
