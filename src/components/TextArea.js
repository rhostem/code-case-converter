import React, { Component } from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  width: 100%;
  display: block;
  min-height: 500px;
`

class Comp extends Component {
  // handleChange = e => {
  //   console.log(`e.target.value`, e.target.value)
  // }

  render() {
    return <TextArea {...this.props} />
  }
}

export default Comp
