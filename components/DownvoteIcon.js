import React from 'react'
import Svg, { Path } from 'react-native-svg'

const DownvoteIcon = props => (
  <Svg width={13} height={19} fill="none" {...props}>
    <Path
      d="M9.389 0v11.104H13L6.26 19 0 11.104h3.443V0h5.946z"
      fill="#FC8F2B"
    />
  </Svg>
)

export default DownvoteIcon
