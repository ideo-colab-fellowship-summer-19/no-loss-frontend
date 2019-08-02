import React from "react";

const AnimatingSpinnerBigWhite = props => (
  <svg
    width={100}
    height={100}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="lds-rolling"
    style={{ background: "0 0" }}
    {...props}
  >
    <circle
      cx={50}
      cy={50}
      fill="none"
      stroke="#CA5B3D"
      strokeWidth={4}
      r={20}
      strokeDasharray="56.548667764616276 20.84955592153876"
      transform="rotate(77.954 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default AnimatingSpinnerBigWhite;
