import React from 'react'
import styled from 'styled-components'

const InputEl = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  border: solid 1px #dee0e4;
  padding: 0 12px;
  font-size: 14px;
  display: flex;
  flex: 1;
  background-color: #ffffff;

  &::placeholder {
    color: #dee0e4;
  }
`

export default props => {
  return <InputEl {...props} />
}
