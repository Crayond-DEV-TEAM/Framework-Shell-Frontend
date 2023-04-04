import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { SvgIcon, SvgIconProps, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    fill: (props) => props?.fill ?? '#CED3DD',
    '&:hover': {
      fill: (props) => props?.hoverFill ?? '#4E5A6B',
    },
  },
}));

const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      borderRadius: '4px',
      padding: '12px',
      backgroundColor: '#FFFFFF',
      color: '#4E5A6B',
      border: '1px solid #E4E8EE',
      boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.04)',
      fontSize: '14px',
      fontFamily: "'OpenSans-SemiBold', 'Roboto-SemiBold', Arial, sans-serif",
    },
  }),
);

interface SVGIcons extends SvgIconProps {
  rootStyle: SxProps;
  info: any;
}

const InfoIcon = (props: SVGIcons) => {
  const { info = '' } = props;
  const classes = useStyles(props);

  return (
    <LightTooltip title={info} placement="top">
      <svg
        className={classes.root}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={20}
        height={20}
        {...props}
      >
        <path d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm-1 3v2h2V7h-2zm0 4v6h2v-6h-2z" />
      </svg>
    </LightTooltip>
  );
};

export default InfoIcon;
