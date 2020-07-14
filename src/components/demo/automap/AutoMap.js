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
  const [clickedPointIndex, setClickedPointIndex] = useState(-1)

  const getMousePosition = (event, canvas) => {
    const rect = canvas.getBoundingClientRect()
    return new Point(
      (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
  }

  const mouseDown = (event) => {
    const canvas = refMiniMap.current
    const {x, y} = getMousePosition(event, canvas)
    const clickedPointIndex = edgePointList.findIndex((pointer) => (
      (pointer.x-(radius/2)) <= x) && (x <= pointer.x+(radius/2))
      && (pointer.y-(radius/2) <= y) && (y <= pointer.y+(radius/2))
    )

    if (clickedPointIndex >= 0) {
      setClickedPointIndex(clickedPointIndex)
    }
  }

  const mouseUp = () => {
    setClickedPointIndex(-1)
  }

  const mouseMove = (event) => {
    if(clickedPointIndex >= 0) {
      const canvas = refMiniMap.current

      const clickedPoint = edgePointList[clickedPointIndex]
      const {x, y} = getMousePosition(event, canvas)
      
      if(Math.abs(clickedPoint.x-x) >= 1 
        || Math.abs(clickedPoint.y-y) >= 1) {
          const updatedEdgePointList = edgePointList.map(
            (point, index) => index === clickedPointIndex ? new Point(x, y) : point)
  
          setEdgePointList(updatedEdgePointList)
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