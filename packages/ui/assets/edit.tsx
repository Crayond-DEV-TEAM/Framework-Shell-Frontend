import * as React from "react"

const editIMG = (props: React.SVGProps<SVGSVGElement>):JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} {...props}>
    <path
      d="M11.424 0A2.571 2.571 0 0 0 9.6.752L1.443 8.909a1.29 1.29 0 0 0-.328.559L.021 13.296a.553.553 0 0 0 .683.683l3.83-1.089a1.292 1.292 0 0 0 .557-.328L13.248 4.4A2.576 2.576 0 0 0 11.424 0Zm0 1.1a1.468 1.468 0 0 1 1.042.435 1.465 1.465 0 0 1 0 2.084l-.715.715-2.084-2.086.715-.715a1.469 1.469 0 0 1 1.042-.434ZM8.885 3.03l2.085 2.085-6.661 6.66a.187.187 0 0 1-.08.047l-2.872.821.821-2.873a.18.18 0 0 1 .047-.079Z"
      fill={props?.color}
    />
  </svg>
)

export default editIMG
