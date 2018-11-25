import React from 'react'
import styled from 'styled-components'
// import mixin from 'styles/mixin'

const Wrap = styled.div`
  display: flex;
  align-items: center;
  & > input {
    &:disabled + label {
      color: #c2c2c2;
    }
  }

  & > input + label {
    display: inline-block;
    position: relative;
    padding-left: 5px;
    margin-right: 1rem;
    min-width: 80px;

    &:hover {
      cursor: pointer;
    }
  }
`

export default function RadioGroup({ children }) {
  return <Wrap>{children}</Wrap>
}
