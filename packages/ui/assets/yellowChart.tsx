import * as React from "react";

const YellowChart = (props: React.SVGProps<SVGSVGElement>):JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={67.559}
    height={40.013}
    {...props}
  >
    <path
      data-name="Path 98194"
      d="M66.329 25.92 61.265 7.599c-2.3-8.324-6.471-8.443-8.822-.252l-7.364 25.656c-1.262 4.394-3.047 6.4-5.095 5.931-1.187-.231-2.647-2.306-3.712-6.128L29.153 7.264c-2.284-8.2-6.393-8.376-8.753-.384l-2.775 9.4c-1.839 6.23-4.841 7.691-7.217 3.519L1.364 3.92"
      fill="none"
      stroke="#e7e027"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export default YellowChart;
