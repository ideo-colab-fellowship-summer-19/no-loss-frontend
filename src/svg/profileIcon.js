import React from 'react'

const ProfileIcon = props => (
  <svg width={20} height={18} fill="none" {...props}>
    <mask id="prefix__a" fill="#fff">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 18a9.985 9.985 0 004-8c0-5.523-4.477-10-10-10S0 4.477 0 10a9.985 9.985 0 004 8 6 6 0 0112 0z"
      />
    </mask>
    <path
      d="M16 18h-1a1 1 0 001.6.8L16 18zM4 18l-.6.8A1 1 0 005 18H4zm15-8a8.985 8.985 0 01-3.6 7.201l1.2 1.6C19.27 16.794 21 13.598 21 10h-2zm-9-9a9 9 0 019 9h2c0-6.075-4.925-11-11-11v2zm-9 9a9 9 0 019-9v-2C3.925-1-1 3.925-1 10h2zm3.6 7.201A8.985 8.985 0 011 10h-2c0 3.6 1.73 6.795 4.4 8.8l1.2-1.599zm.4.8V18H3h2zM5 18a5 5 0 015-5v-2a7 7 0 00-7 7h2zm5-5a5 5 0 015 5h2a7 7 0 00-7-7v2zm5 5h2-2z"
      fill="#C4C4C4"
      mask="url(#prefix__a)"
    />
    <circle cx={10} cy={7} r={2.5} stroke="#C4C4C4" />
  </svg>
)

export default ProfileIcon