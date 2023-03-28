import { SvgIcon } from '@mui/material';

export function Visibility(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    height: 22,
    width: 22,
    color: '#0E1824',
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" {...rest} sx={rootSx}>
      <path
        id="icons8-eye"
        d="M7,9A7.263,7.263,0,0,0,.013,14.306a.438.438,0,1,0,.848.218A6.422,6.422,0,0,1,7,9.878a6.433,6.433,0,0,1,6.143,4.646.438.438,0,1,0,.848-.218A7.272,7.272,0,0,0,7,9Zm0,2.342a2.829,2.829,0,1,0,2.819,2.829A2.83,2.83,0,0,0,7,11.342Zm0,.878a1.951,1.951,0,1,1-1.944,1.951A1.941,1.941,0,0,1,7,12.22Z"
        transform="translate(0.001 -9)"
      />
    </SvgIcon>
  );
}
export function VisibilityOff(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    height: 22,
    width: 22,
    color: '#0E1824',
    ...rootStyle,
  };
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="17.948"
      height="12.095"
      viewBox="0 0 17.948 12.095"
      {...rest}
      sx={rootSx}
    >
      <g id="Group_106652" data-name="Group 106652" transform="translate(-1134.026 -381.634)">
        <path
          id="icons8-eye"
          d="M7,9A7.263,7.263,0,0,0,.013,14.306a.438.438,0,1,0,.848.218A6.422,6.422,0,0,1,7,9.878a6.433,6.433,0,0,1,6.143,4.646.438.438,0,1,0,.848-.218A7.272,7.272,0,0,0,7,9Zm0,2.342a2.829,2.829,0,1,0,2.819,2.829A2.83,2.83,0,0,0,7,11.342Zm0,.878a1.951,1.951,0,1,1-1.944,1.951A1.941,1.941,0,0,1,7,12.22Z"
          transform="translate(1136.001 374)"
        />
        <g
          id="Rectangle_56165"
          data-name="Rectangle 56165"
          transform="translate(1135.392 391.497) rotate(-30)"
          stroke="#fff"
          stroke-linecap="round"
          stroke-width="1"
        >
          <rect width="16.993" height="1" rx="0.5" stroke="none" />
          <rect x="-0.5" y="-0.5" width="17.993" height="2" rx="1" fill="none" />
        </g>
      </g>
    </SvgIcon>
  );
}
export function FilterIcon(props: any) {
  const { rootStyle, ...rest } = props;
  const rootSx = {
    width: 16,
    height: 16,
    color: '#0f0b11',
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" sx={rootSx} {...rest}>
      <path
        d="M7.111 6A1.121 1.121 0 006 7.111v1.373A3.335 3.335 0 007.271 11.1l4.507 3.551v6.68a.667.667 0 001.054.543l3.111-2.222a.667.667 0 00.28-.543v-4.456l4.507-3.55A3.335 3.335 0 0022 8.484V7.111A1.121 1.121 0 0020.889 6zm.222 1.333h13.334v1.151a2 2 0 01-.762 1.57l-4.444 3.5h-2.922L8.1 10.055a2 2 0 01-.762-1.57zm5.778 7.556h1.778v3.879l-1.778 1.27z"
        transform="translate(-6 -6)"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
