import React from 'react'

const HeartSmallIcon = props => (
  <svg width={15} height={15} fill="none" {...props}>
      <path
        d="M13.977 4.13C13.772 1.881 12.18.25 10.187.25c-1.326 0-2.542.714-3.226 1.86C6.284.948 5.118.248 3.811.248 1.82.249.228 1.88.024 4.13c-.016.1-.082.622.12 1.475.29 1.23.96 2.349 1.938 3.234l4.877 4.426L11.92 8.84c.978-.886 1.648-2.005 1.938-3.235.202-.853.136-1.375.12-1.475z"
        fill={props.userliked ? "#03AEF8" : "rgba(#666666, 0)"}
        stroke={props.userliked ? "#03AEF8" : "#666"}
        strokeWidth={0.879}
      />
  </svg>
)

export default HeartSmallIcon
