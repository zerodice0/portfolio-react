export const drawFillRect = (context, centerPoint) => {
  if(!context) {return false}
  
  const radius = 5
  const {x, y} = centerPoint

  context.fillStyle="#ffffff"
  context.strokeStyle="#000000"
  context.beginPath()
  context.fillRect(x-radius, y-radius, radius*2, radius*2)
  context.strokeRect(x-radius, y-radius, radius*2, radius*2)
}

export const drawFillArc = (context, centerPoint, label) => {
  if(!context) {return false}

  const radius = 5
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
  label && context.strokeText(label, x-2.5, y+2.5)
}

export const drawLineToPoint = (context, currentPoint) => {
  const radius = 5;
  if(!context) { return false }
  context.moveTo(currentPoint.x, currentPoint.y)
  context.arc(currentPoint.x, currentPoint.y, radius, 0, 2*Math.PI)
  context.fill()
}