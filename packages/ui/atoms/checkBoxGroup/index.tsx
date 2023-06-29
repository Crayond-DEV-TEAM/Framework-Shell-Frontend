import * as React from 'react';
import type { FormControlLabelProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface Props extends Omit<CheckboxProps, 'icon' | 'checkedIcon'> {
  checklist: any[];
  checked: any[];
  handleChange: (checked: any) => void;
}

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked?: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: 0,
    // borderBottom: '1px solid #EAEAEA',
    '.MuiFormControlLabel-label': {
      fontSize: '12px',
    },
  }),
);

export const GroupCheckBox: React.FC<Props> = ({ checklist, checked, handleChange, ...rest }) => {
  const [list, setList] = React.useState<any>(checklist);
  const handleCheck = (id: string, value: any) => {
    console.log(checked);
    const data: any = list;
    data.map((x: any) => {
      if (x.id === id) {
        x.checked = value;
      }
      if (checked.includes(x.id)) {
        x.checked = true;
      }
    });
    // setList(data);
    handleChange(data);
  };

  React.useEffect(() => {
    setList([...checklist]);
  }, [checklist]);
  return (
    <div>
      {list.map((x: any, index: any) => {
        return (
          <StyledFormControlLabel
            label={x?.name}
            key={index}
            labelPlacement="start"
            control={
              <Checkbox
                icon={<RadioButtonUncheckedRoundedIcon />}
                checkedIcon={<CheckCircleRoundedIcon />}
                checked={checked.includes(x.id)}
                // indeterminate={checked[0] !== checked[1]}
                onChange={(e) => handleCheck(x.id, e?.target.checked)}
              />
            }
          />
        );
      })}
    </div>
  );
};
