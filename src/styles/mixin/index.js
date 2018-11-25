import { css } from 'styled-components'
import * as centered from './centered'

const clearFix = () => css`
  &:after {
    content: '';
    clear: both;
    display: table;
  }
`

export default {
  ...centered,
  clearFix,
}
