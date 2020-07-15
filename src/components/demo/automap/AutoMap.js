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
  const UPDATE_PATH_MODE_EDGE_POINT = 0
  const UPDATE_PATH_MODE_MIDDLE_POINT = 1

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

  const updatePath = (event, canvas, mode) => {
    const clickedPointIndex = mode === UPDATE_PATH_MODE_EDGE_POINT
      ? clickedEdgePointIndex : clickedMiddlePointIndex
    const path = mode === UPDATE_PATH_MODE_EDGE_POINT
      ? edgePointList : middlePointList
    if(clickedPointIndex >= 0) {
      const clickedPoint = path[clickedPointIndex]
      const {x, y} = getMousePosition(event, canvas)
      const setPath = mode === UPDATE_PATH_MODE_EDGE_POINT
        ? setEdgePointList : setMiddlePointList
      
      if(Math.abs(clickedPoint.x-x) >= 1 
      || Math.abs(clickedPoint.y-y) >= 1) {
          const updatedPointList = path.map(
            (point, index) => index === clickedPointIndex ? new Point(x, y) : point
          )
  
          setPath(updatedPointList)
          updateCanvas(canvas, edgePointList, middlePointList)
      }

    }
  }

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
    const mode = clickedEdgePointIndex >= 0 ? UPDATE_PATH_MODE_EDGE_POINT
      : clickedMiddlePointIndex >= 0 ? UPDATE_PATH_MODE_MIDDLE_POINT
      : false

    updatePath(event, canvas, mode)
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