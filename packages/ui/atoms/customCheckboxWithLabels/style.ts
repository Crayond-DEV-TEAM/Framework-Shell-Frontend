import type { SxProps } from '@mui/material';

interface CustomCheckboxWithLabelsStyleProps {
  [key: string]: SxProps;
}

export const customCheckboxWithLabelsStyle: CustomCheckboxWithLabelsStyleProps = {
  rootSx: {
    display: 'flex',
    alignItems: 'center',
  },
  typographyTxt: {
    fontSize: '12px',
  },
};
