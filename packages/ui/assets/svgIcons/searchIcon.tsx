import * as React from "react"

const SearchIMG = (props: React.SVGProps<SVGSVGElement>):JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} {...props}>
    <path
      d="M5.639 0A5.639 5.639 0 1 0 9.03 10.131l3.642 3.641a.778.778 0 1 0 1.1-1.1L10.131 9.03A5.626 5.626 0 0 0 5.639 0Zm0 1.556a4.084 4.084 0 0 1 2.974 6.882.778.778 0 0 0-.174.174 4.084 4.084 0 1 1-2.8-7.056Z"
      fill={props?.color}
    />
  </svg>
)

export default SearchIMG