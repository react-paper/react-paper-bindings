const NUM_CIRCLES = 10
const NUM_RECTANGLES = 10

export const COLORS = [
  'green','greenyellow','orange','brown','gold','fuchsia','syan','chartreuse',
  'violet','purple','yellow','red','blue','grey','pink','magenta','orangered',
  'cyan',
]

export function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min
}

export function createCircle(key, x, y) {
  return {
    key,
    center: [x, y],
    fillColor: COLORS[getRandomInt(0,COLORS.length-1)],
    radius: getRandomInt(5,20),
  }
}

export function createCircles(w, h) {
  w = w || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  h = h || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return [...Array(NUM_CIRCLES).keys()].map(i =>
    createCircle(i, getRandomInt(0,w), getRandomInt(0,h)))
}

export function createRectangle(key, x, y) {
  return {
    key,
    center: [x, y],
    fillColor: COLORS[getRandomInt(0,COLORS.length-1)],
    size: getRandomInt(10,40),
  }
}

export function createRectangles(w, h) {
  w = w || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  h = h || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return [...Array(NUM_RECTANGLES).keys()].map(i =>
    createRectangle(i, getRandomInt(0,w), getRandomInt(0,h)))
}

export function getEventXY(e) {
  return {
    x: (e.touches) ? e.touches[0].pageX : e.pageX,
    y: (e.touches) ? e.touches[0].pageY : e.pageY,
  }
}
