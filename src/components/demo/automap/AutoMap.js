import React, {useRef, useEffect, useState} from 'react'
import {drawFillArc, drawFillRect} from './Drawer'
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
  
  const refMiniMap = useRef(null)
  const [middlePointList, setMiddlePointList] = useState([
    new Point(10, 10),
    new Point(125, 30)
  ])
  const [edgePointList, setEdgePointList] = useState([
    new Point(50, 140),
    new Point(100, 40),
    new Point(150, 120)
  ])

  const drawPaths = (context) => {
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

  const drawPoints = (context) => {
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

  const getMousePosition = (event, canvas) => {
    const rect = canvas.getBoundingClientRect()
    return new Point(
      (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
  }

  useEffect(() => {
    const canvas = refMiniMap.current
    const context = canvas.getContext("2d")

    drawPaths(context)
    drawPoints(context)

    canvas.addEventListener("mousedown", (event) => {
      const {x, y} = getMousePosition(event, canvas)

      console.log(`${x}, ${y}`)
    })
    canvas.addEventListener("mouseup", () => (alert("mouseup")))
    canvas.addEventListener("mousemove", () => (console && console.log("mousemove")))
    canvas.addEventListener("dblclick", (event) => {
      event.preventDefault()
      alert("dblclick")
    })
  })

  return <Context>
    <MiniMap ref={refMiniMap}/>
  </Context>
}

export default AutoMap