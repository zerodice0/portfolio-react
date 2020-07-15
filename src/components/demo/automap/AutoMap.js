import React, {useRef, useEffect, useState} from 'react'
import {updateCanvas, radius} from './Drawer'
import Point from './Point'
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
  const [clickedEdgePointIndex, setClickedEdgePointIndex] = useState(-1)
  const [clickedMiddlePointIndex, setClickedMiddlePointIndex] = useState(-1)

  const getMousePosition = (event, canvas) => {
    const rect = canvas.getBoundingClientRect()
    return new Point(
      (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
  }

  const mouseDown = (event) => {
    const canvas = refMiniMap.current
    const {x, y} = getMousePosition(event, canvas)
    const clickedEdgePointIndex = edgePointList.findIndex((pointer) => (
      (pointer.x-(radius/2)) <= x) && (x <= pointer.x+(radius/2))
      && (pointer.y-(radius/2) <= y) && (y <= pointer.y+(radius/2))
    )
    const clickedMiddlePointIndex = middlePointList.findIndex((pointer) => (
      (pointer.x-(radius/2)) <= x) && (x <= pointer.x+(radius/2))
      && (pointer.y-(radius/2) <= y) && (y <= pointer.y+(radius/2))
    )

    if (clickedEdgePointIndex >= 0) {
      setClickedEdgePointIndex(clickedEdgePointIndex)
    }

    if (clickedMiddlePointIndex >= 0) {
      setClickedMiddlePointIndex(clickedMiddlePointIndex)
    }
  }

  const mouseUp = () => {
    const canvas = refMiniMap.current
    
    setClickedEdgePointIndex(-1)
    setClickedMiddlePointIndex(-1)
    updateCanvas(canvas, edgePointList, middlePointList)
  }

  const mouseMove = (event) => {
    const canvas = refMiniMap.current

    if(clickedEdgePointIndex >= 0) {

      const clickedEdgePoint = edgePointList[clickedEdgePointIndex]
      const {x, y} = getMousePosition(event, canvas)
      
      if(Math.abs(clickedEdgePoint.x-x) >= 1 
        || Math.abs(clickedEdgePoint.y-y) >= 1) {
          const updatedEdgePointList = edgePointList.map(
            (point, index) => index === clickedEdgePointIndex ? new Point(x, y) : point)
  
          setEdgePointList(updatedEdgePointList)
          updateCanvas(canvas, edgePointList, middlePointList)
        }

    }

    if(clickedMiddlePointIndex >= 0) {
      const clickedMiddlePoint = middlePointList[clickedMiddlePointIndex]
      const {x, y} = getMousePosition(event, canvas)

      if(Math.abs(clickedMiddlePoint.x-x) >= 1 
        || Math.abs(clickedMiddlePoint.y-y) >= 1) {
          const updateMiddlePoint = middlePointList.map(
            (point, index) => index === clickedMiddlePointIndex ? new Point(x, y) : point)
  
          setMiddlePointList(updateMiddlePoint)
          updateCanvas(canvas, edgePointList, middlePointList)
        }

    }
  }

  const doubleClick = (event) => {
    event.preventDefault()
    console && console.log("dblclick")
  }

  useEffect(() => {
    updateCanvas(refMiniMap.current, edgePointList, middlePointList)
  }, [])

  return <Context>
    <MiniMap ref={refMiniMap}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onDoubleClick={doubleClick}
      onMouseUp={mouseUp}/>
  </Context>
}

export default AutoMap