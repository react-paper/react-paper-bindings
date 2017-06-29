export const COLORS = [
  'green','greenyellow','orange','brown','gold','fuchsia','syan','chartreuse',
  'violet','purple','yellow','red','blue','grey','pink','magenta','orangered',
  'cyan',
]

export function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min
}

export function getRandomColor() {
  return COLORS[getRandomInt(0,COLORS.length-1)]
}
