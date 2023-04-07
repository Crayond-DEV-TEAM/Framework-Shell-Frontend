import * as React from "react"

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>):JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14.389}
        height={14.4}
        {...props}
    >
        <path
            d="M7.183.201a.777.777 0 0 0-.766.788v7.45l-1-1a.778.778 0 1 0-1.1 1.1l2.332 2.332a.777.777 0 0 0 1.1 0l2.327-2.343a.778.778 0 1 0-1.1-1.1l-1 1V.988A.777.777 0 0 0 7.187.2ZM2.532 4.486A2.343 2.343 0 0 0 .2 6.817v5.052a2.343 2.343 0 0 0 2.332 2.332h9.326a2.343 2.343 0 0 0 2.332-2.332V6.817a2.343 2.343 0 0 0-2.332-2.332h-1.166a.777.777 0 1 0 0 1.554h1.166a.766.766 0 0 1 .777.777v5.052a.766.766 0 0 1-.777.777H2.532a.766.766 0 0 1-.777-.777V6.817a.766.766 0 0 1 .777-.777H3.7a.777.777 0 1 0 0-1.554Z"
            fill="#5a5a5a"
            stroke="#fff"
            strokeWidth={0.4}
        />
    </svg>
)

export default DownloadIcon
