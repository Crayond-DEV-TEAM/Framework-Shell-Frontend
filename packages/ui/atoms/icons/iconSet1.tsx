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
export function SearchIcon(props: any) {
  const { rootStyle, ...rest } = props;
  const rootSx = {
    width: 18,
    height: 18,
    color: '#29302B',
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" sx={rootSx} {...rest}>
      <path
        d="M12.444 6a6.444 6.444 0 103.876 11.578l4.162 4.161a.889.889 0 101.257-1.257l-4.161-4.162A6.43 6.43 0 0012.444 6zm0 1.778a4.668 4.668 0 013.4 7.865.889.889 0 00-.2.2 4.667 4.667 0 11-3.2-8.064z"
        transform="translate(-6 -6)"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
