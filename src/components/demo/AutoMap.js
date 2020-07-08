import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'

const Context = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MiniMap = styled.canvas`
  width: 640px;
  height: 360px;
  border: 1px solid black;
`


const AutoMap = () => {
  class Point {
    constructor(x=0, y=0) {
      this.x = x
      this.y = y
    }
  }
  
  /*This function calcCtrlPoint() will return the result of calculating bezier point.*/
  function calcControlPoint(pointA, pointB, pointC, rate){
    var controlPointX = (pointB.x-Math.pow(rate, 2)*pointC.x-Math.pow((1-rate), 2)*pointA.x)/(2*rate*(1-rate));
    var controlPointY = (pointB.y-Math.pow(rate, 2)*pointC.y-Math.pow((1-rate), 2)*pointA.y)/(2*rate*(1-rate));
  
    return new Point(controlPointX, controlPointY);
  }
  
  const drawLineToPoint = (context, currentPoint) => {
    const radius = 5;
    if(!context) { return false }
    context.lineTo(currentPoint.x, currentPoint.y)
    context.moveTo(currentPoint.x, currentPoint.y)
    context.arc(currentPoint.x, currentPoint.y, radius, 0, 2*Math.PI)
    context.fill()
    context.moveTo(currentPoint.x, currentPoint.y)
  }

  const drawFillArc = (context, centerPoint) => {
    const radius = 5
    if(!context) {return false}
    context.moveTo(centerPoint.x, centerPoint.y)
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2*Math.PI)
    context.fill()
    context.moveTo(centerPoint.x, centerPoint.y)
  }
  
  const refMiniMap = useRef(null)

  useEffect(() => {
    const canvas = refMiniMap.current
    const context = canvas.getContext("2d")

    const pointA = new Point(50, 140)
    const pointB = new Point(10, 10)
    const pointC = new Point(100, 40)

    const controlPoint = calcControlPoint(pointA, pointB, pointC, 0.5)

    context.beginPath()
    context.moveTo(pointA.x, pointA.y)
    context.quadraticCurveTo(controlPoint.x, controlPoint.y, pointC.x, pointC.y)
    context.closePath()
    context.stroke()
    
    context.beginPath()
    context.moveTo(pointA.x, pointA.y)
    drawLineToPoint(context, pointA)
    drawLineToPoint(context, pointB)
    drawLineToPoint(context, pointC)
    context.closePath()
    context.stroke()
    // drawLineToPoint(context, pointA)
    // drawLineToPoint(context, pointB)
    // drawLineToPoint(context, pointC)
  })

  return <Context>
    <MiniMap ref={refMiniMap}/>
  </Context>
}

export default AutoMap