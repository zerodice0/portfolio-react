import Point from './Point'

export const radius = 5

// This function calcCtrlPoint() will return the result of calculating bezier point.
const calcControlPoint = (pointA, pointB, pointC, rate) => {
  var controlPointX = (pointB.x-Math.pow(rate, 2)*pointC.x-Math.pow((1-rate), 2)*pointA.x)/(2*rate*(1-rate));
  var controlPointY = (pointB.y-Math.pow(rate, 2)*pointC.y-Math.pow((1-rate), 2)*pointA.y)/(2*rate*(1-rate));

  return new Point(controlPointX, controlPointY);
}

const drawFillRect = (context, centerPoint) => {
  if(!context) {return false}
  const {x, y} = centerPoint

  context.fillStyle="#ffffff"
  context.strokeStyle="#000000"
  context.beginPath()
  context.fillRect(x-radius, y-radius, radius*2, radius*2)
  context.strokeRect(x-radius, y-radius, radius*2, radius*2)
}

const drawFillArc = (context, centerPoint, label) => {
  if(!context) {return false}

  const {x, y} = centerPoint
  
  context.beginPath()
  context.fillStyle="#000000"
  context.moveTo(x, y)
  context.arc(x, y, radius, 0, 2*Math.PI)
  context.fill()

  context.beginPath()
  context.moveTo(x, y)
  context.fillStyle="#ffffff"
  context.arc(x, y, radius-1, 0, 2*Math.PI)
  context.fill()
  context.moveTo(x, y)

  context.font="8px serif"
  context.fillStyle="#000000"
  label && context.strokeText(label, x-radius/2, y+radius/2)
}

export const drawLineToPoint = (context, currentPoint) => {
  if(!context) { return false }

  context.moveTo(currentPoint.x, currentPoint.y)
  context.arc(currentPoint.x, currentPoint.y, radius, 0, 2*Math.PI)
  context.fill()
}

export const drawPaths = (context, edgePointList, middlePointList) => {
  for(let i=0; i<edgePointList.length-1; i++) {
    const [startPoint, endPoint] = edgePointList.slice(i, i+2)
    const [middlePoint] = middlePointList.slice(i, i+1)
    const controlPoint = calcControlPoint(startPoint, middlePoint, endPoint, 0.5)

    context.beginPath()
    context.moveTo(startPoint.x, startPoint.y)
    context.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y)
    context.stroke()
  }
}

export const drawPoints = (context, edgePointList, middlePointList) => {
  context.beginPath()
  context.moveTo(edgePointList[0].x, edgePointList[0].y)
  
  edgePointList.forEach((point, index) => {
    drawFillArc(context, point, index+1)
  })
  middlePointList.forEach(point => {
    drawFillRect(context, point)
  })
  
  context.closePath()
  context.stroke()
}

export const updateCanvas = (canvas, edgePointList, middlePointList) => {
  const context = canvas.getContext("2d")
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawPaths(context, edgePointList, middlePointList)
  drawPoints(context, edgePointList, middlePointList)
}