import { Checkbox, CheckboxProps, styled } from '@mui/material';
import { checkBox_style } from './style';

interface Props extends Omit<CheckboxProps, 'icon' | 'checkedIcon'> {
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  checkStyle?: any;
  checkSecondStyle?: any;
  header?: string;
  defaultChecked?: any;
}

const BpIcon = styled('span')<{ checkStyle?: any }>(({ checkStyle }) => ({
  borderRadius: '50px',
  border: '1px solid #d5d4d4',
  width: 17,
  height: 17,
  boxShadow: checkStyle ? 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)' : 'none',
  backgroundColor: '#f5f8fa',
  '.Mui-focusVisible &': {
    outline: '1px auto rgba(19,124,189,.6)',
    outlineOffset: 0,
  },
  ...checkStyle,
}));

const BpCheckedIcon = styled(BpIcon)<{
  checkSecondStyle?: any;
}>(({ checkSecondStyle }) => ({
  backgroundColor: '#007965',
  backgroundImage: '#007965',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    boxShadow: 'none',
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#007965',
  },
  ...checkSecondStyle,
}));

export const CheckBox: React.FC<Props> = ({
  disableRipple = true,
  icon,
  checkStyle,
  checkSecondStyle,
  checkedIcon,
  checked,
  disabled = false,
  value = '',
  className = '',
  header = '',
  onChange = () => false,
  defaultChecked,
  ...rest
}) => {
  // console.log(
  //   defaultChecked?.map((x: any) => x.name),
  //   'defaultChecked',
  // );
  return (
    <Checkbox
      defaultChecked={defaultChecked}
      disabled={disabled}
      checked={checked}
      disableRipple={disableRipple}
      sx={{ ...checkBox_style.checkSx, ...checkStyle }}
      onChange={onChange}
      value={value}
      icon={<BpIcon sx={{ ...checkStyle }} />}
      checkedIcon={<BpCheckedIcon sx={{ ...checkStyle, ...checkSecondStyle }} />}
    />
  );
};
