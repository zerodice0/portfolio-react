import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {Button} from 'antd'
import 'antd/dist/antd.css'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'

const TabRow = styled.div`
width: 100%;
height: 3rem;
background-color: #bdbdbd;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;`

const ContextRow = styled.div`
width: 100%;
height: 100%;
display: flex;
background-color: #bdbdbd;`

const LeftNavigation = styled.div`
width: 0%;
display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
align-content: center;
background-color: #ffffff;
transition-duration: 0.3s;

${props => props.isOpen &&
  css`
    width: 30%;
  `};
`

const RightContent = styled.div`
width: 100%;
display: flex;
background-color: #bdbdbd;
transition-duration: 0.3s;

${props => props.isOpen &&
  css`
    width: 80%;
  `}
`

const LeftTabSpace = styled.div`
  width: 0%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  transition-duration: 0.3s;
  line-height: 3rem;
  font-size: 0rem;
  ${props => props.isOpen &&
    css`
      font-size: 1.5rem;
      width: 30%;
    `};
`

const RightTabSpace = styled.div`
  width:100%;
  height: 100%;
  background-color: #bdbdbd;
  transition-duration: 0.3s;
  ${props => props.isOpen &&
    css`
      width: 80%;
    `};
`

const Icon = styled.div`
  width: fit-content;
  line-height: 1rem;
  background-color: #ffffff;
`

const Context = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;`

const App = () => {
  const [menu, toggleMenu] = useState(true)

  return <Context>
    <TabRow>
      <LeftTabSpace isOpen={menu}>
        BlackBear's Portfolio
      </LeftTabSpace>
      <RightTabSpace isOpen={menu}>
        <Icon>
          <MenuOpenIcon onClick={() => toggleMenu(!menu)}/>
        </Icon>
      </RightTabSpace>
    </TabRow>
    <ContextRow>
      <LeftNavigation isOpen={menu}>
        LeftNavigation
      </LeftNavigation>
      <RightContent isOpen={menu}>
        RightContent
      </RightContent>
    </ContextRow>
  </Context>
}

export default App