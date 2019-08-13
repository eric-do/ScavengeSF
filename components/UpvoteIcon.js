import React from 'react'
import Svg, { Path } from 'react-native-svg'

const UpvoteIcon = props => (
  <Svg width={13} height={19} fill="none" {...props}>
    <Path
      d="M3.611 19V7.896H0L6.74 0 13 7.896H9.557V19H3.611z"
      fill="#2BFC59"
    />
  </Svg>
)

export default UpvoteIcon
