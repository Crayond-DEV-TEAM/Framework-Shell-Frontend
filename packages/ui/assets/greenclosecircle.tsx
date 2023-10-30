import * as React from 'react';
import { SvgIcon, SvgIconProps, SxProps, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

interface SVGIcons extends SvgIconProps {
  rootStyle: SxProps;
  info: any;
  hoverFill?: any;
}

const InfoIcon = (props: SVGIcons) => {
  const { info = '' } = props;

  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '12px',
        backgroundColor: '#FFFFFF',
        color: '#4E5A6B',
        border: '1px solid #E4E8EE',
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.04)',
        fontSize: '14px',
        fontFamily: "'OpenSans-SemiBold', 'Roboto-SemiBold', Arial, sans-serif",
      }}
      title={info}
    >
      <SvgIcon
        sx={{
          fill: (props: any) => props?.fill ?? '#CED3DD',
          '&:hover': {
            fill: (props: any) => props?.hoverFill ?? '#4E5A6B',
          },
          placement: 'top',
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={20}
        height={20}
        {...props}
      >
        <path d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm-1 3v2h2V7h-2zm0 4v6h2v-6h-2z" />
      </SvgIcon>
    </div>
  );
};

export default InfoIcon;
