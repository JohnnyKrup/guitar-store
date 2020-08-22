import React from "react"
import styled from "styled-components"
import Directory from "../components/directory/directory.component"

const HomePage = () => {
  return (
    <Wrapper>
      <Directory />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default HomePage
