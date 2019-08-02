import React from 'react'

const LeftArrow = props => (
  <svg width={10} height={19} fill="none" {...props}>
    <path
      d="M9 1L1 9.5 9 18"
      stroke="#A5A5A5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default LeftArrow
