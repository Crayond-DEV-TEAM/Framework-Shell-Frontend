import * as React from "react";

const CopyIcon = (props: React.SVGProps<SVGSVGElement>):JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path
      d="M3.692 0A3.7 3.7 0 0 0 0 3.692v12.923a3.7 3.7 0 0 0 3.692 3.692h2.77v-1.845h-2.77a1.845 1.845 0 0 1-1.846-1.846V3.692a1.845 1.845 0 0 1 1.846-1.846h5.8a.737.737 0 0 1 .346.2 4.577 4.577 0 0 1 1.24-.2h.981C10.868.663 10.064 0 9.231 0Zm7.385 2.769a3.7 3.7 0 0 0-3.692 3.693v13.846A3.7 3.7 0 0 0 11.077 24h9.231A3.7 3.7 0 0 0 24 20.308V10.154c0-.981-.9-1.911-2.51-3.49-.224-.22-.465-.465-.692-.692s-.472-.44-.692-.663c-1.58-1.609-2.506-2.54-3.491-2.54Zm0 1.846h5.8c.667.169.663.97.663 1.788v1.9a.925.925 0 0 0 .923.923h1.846c.919 0 1.846 0 1.846.923v10.159a1.845 1.845 0 0 1-1.846 1.846h-9.232a1.845 1.845 0 0 1-1.846-1.846V6.462a1.845 1.845 0 0 1 1.846-1.847Zm9.173 8.625Z"
      fill="#848484"
    />
  </svg>
);

export default CopyIcon;