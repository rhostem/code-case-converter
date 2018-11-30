import React from 'react'
import styled from 'styled-components'
// import mixin from 'styles/mixin'

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.1rem;
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
    min-width: 60px;

    &:hover {
      cursor: pointer;
    }
  }
`

export default function RadioGroup({ children }) {
  return <Wrap>{children}</Wrap>
}
