import styled from 'styled-components'
import media from '../styles/media'

export const Page = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;

  ${media.smallOnly} {
    width: 100%;
  }
`
