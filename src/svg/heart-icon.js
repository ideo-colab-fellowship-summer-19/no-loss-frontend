import React from 'react'

const HeartIcon = props => (
  <svg width={19} height={19} fill="none" {...props}>
    <g clipPath="url(#prefix__clip0)">
      <path
        d="M18.11 6.134l.002.015.002.015c.012.074.095.672-.143 1.681h0c-.343 1.455-1.137 2.782-2.3 3.838h-.002l-5.934 5.294-5.833-5.293h0C2.735 10.627 1.941 9.3 1.6 7.845h0c-.239-1.01-.156-1.608-.144-1.682l.003-.015.001-.015c.24-2.646 2.09-4.475 4.32-4.475 1.476 0 2.8.787 3.577 2.117l.375.643.382-.64c.783-1.31 2.169-2.12 3.675-2.12 2.232 0 4.081 1.83 4.322 4.475z"
        fill={props.userliked ? "#03AEF8" : "rgba(#666666, 0)"}
        stroke={props.userliked ? "#03AEF8" : "#666"}
        strokeWidth={0.879}
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path
          fill="#fff"
          transform="matrix(-1 0 0 1 18.578 .602)"
          d="M0 0h17.585v17.585H0z"
        />
      </clipPath>
    </defs>
  </svg>
)

export default HeartIcon
