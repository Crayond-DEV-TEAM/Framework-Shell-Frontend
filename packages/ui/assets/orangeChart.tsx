import * as React from "react";

const OrangeChart = (props: React.SVGProps<SVGSVGElement>):JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={67.523}
    height={7.608}
    {...props}
  >
    <path
      data-name="Path 98194"
      d="M1.346 2.853 6.41 5.447a11.53 11.53 0 0 0 8.822.036l7.364-3.633a11.066 11.066 0 0 1 5.095-.84 9.365 9.365 0 0 1 3.712.868l7.119 3.617a11.567 11.567 0 0 0 8.753.054l2.775-1.331a11.839 11.839 0 0 1 7.217-.5l9.044 2.249"
      fill="none"
      stroke="#ea637e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export default OrangeChart;
