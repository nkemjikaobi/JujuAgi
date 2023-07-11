/* eslint-disable max-len */
import React from "react";
/**
 * @param {Object} props Component props
 * @return {React.Component} React component
 */
const SVG = (props: any): unknown => (
  <svg fill="none" height="64" viewBox="0 0 64 64" width="64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect fill="#FEFEFE" height="64" rx="32" width="64" />
    <path
      d="M36 32L32 28M32 28L28 32M32 28V37.2C32 38.5907 32 39.2861 32.5505 40.0646C32.9163 40.5819 33.9694 41.2203 34.5972 41.3054C35.5421 41.4334 35.9009 41.2462 36.6186 40.8719C39.8167 39.2036 42 35.8568 42 32C42 26.4772 37.5228 22 32 22C26.4772 22 22 26.4772 22 32C22 35.7014 24.011 38.9331 27 40.6622"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default SVG;
