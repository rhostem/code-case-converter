const breakPoints = {
  small: '639.99px',
  medium: '640px',
  large: '1024px',
  xlarge: '1200px',
  xxlarge: '1440px',
}

const media = {
  smallOnly: `@media screen and (max-width: ${breakPoints.small})`,
  mediumAndUp: `@media screen and (min-width: ${breakPoints.medium})`,
  largeAndUp: `@media screen and (min-width: ${breakPoints.large}))`,
  xlargeAndUp: `@media screen and (min-width: ${breakPoints.xlarge}))`,
}

export default media
