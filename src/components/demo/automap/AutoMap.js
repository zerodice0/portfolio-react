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

  useEffect(() => {
    const canvas = refMiniMap.current
    const context = canvas.getContext("2d")

    const [startPointA, endPointA] = edgePointList.slice(0, 2)
    const [middlePointA] = middlePointList.slice(0, 1)
    const controlPointA = calcControlPoint(startPointA, middlePointA, endPointA, 0.5)
    context.beginPath()
    context.moveTo(startPointA.x, startPointA.y)
    context.quadraticCurveTo(controlPointA.x, controlPointA.y, endPointA.x, endPointA.y)
    context.stroke()

    const [startPointB, endPointB] = edgePointList.slice(1, 3)
    const [middlePointB] = middlePointList.slice(1, 2)
    const controlPointB = calcControlPoint(startPointB, middlePointB, endPointB, 0.5)
    context.beginPath()
    context.moveTo(startPointB.x, startPointB.y)
    context.quadraticCurveTo(controlPointB.x, controlPointB.y, endPointB.x, endPointB.y)
    context.stroke()
    
    context.beginPath()
    context.moveTo(edgePointList[0].x, edgePointList[0].y)
    edgePointList.forEach((point, index) => {drawFillArc(context, point, index+1)})
    middlePointList.forEach(point => {drawFillRect(context, point)})
    context.closePath()
    context.stroke()
  })

  return <Context>
    <MiniMap ref={refMiniMap}/>
  </Context>
}

export default AutoMap