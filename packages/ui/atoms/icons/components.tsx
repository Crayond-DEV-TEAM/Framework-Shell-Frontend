import { SvgIcon } from '@mui/material';

export function DeleteChip(props: any) {
  const { rootStyle, ...rest } = props;

  const rootSx = {
    height: 12,
    width: 12,
    color: '#0E1824',
    ...rootStyle,
  };
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" {...rest} sx={rootSx}>
      <path
        id="icons8-delete"
        d="M18.259,6.97a.7.7,0,0,0-.492.217l-4.788,4.791L8.191,7.187a.705.705,0,1,0-1,1l4.788,4.791L7.194,17.766a.705.705,0,1,0,1,1l4.788-4.791,4.788,4.791a.705.705,0,1,0,1-1l-4.788-4.791,4.788-4.791a.705.705,0,0,0-.5-1.214Z"
        transform="translate(-6.981 -6.97)"
        fill="#fff"
      />
    </SvgIcon>
  );
}
