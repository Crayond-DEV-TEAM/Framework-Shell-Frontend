import { useSubscription } from '@core/store';
import type { SxProps, Theme } from '@mui/material';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { planEffectiveStyle } from './style';

export interface PlanEffectiveProps {
  className?: string;
  sx?: SxProps<Theme>;
  onChange?: any;
}

export const PlanEffective = (props: PlanEffectiveProps): JSX.Element => {
  const { className = '', sx = {}, onChange, ...rest } = props;
  const { setSubscriptionList, createEditSubscription } = useSubscription();

  // const [alignment, setAlignment] = useState<string | null>('left');
  const alignment = createEditSubscription.is_plan_effective === true ? 'true' : 'false';

  const handleChange = (e: any) => {
    const value = JSON.parse(e.target.value);
    setSubscriptionList('is_plan_effective', value);
  };
  return (
    <Box
      sx={[
        {
          ...planEffectiveStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Typography sx={planEffectiveStyle.plnText}>Plan Effective From</Typography>
      {/* <CustomToggle tabOne="now" tabTwo="Next billing" /> */}
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={(e) => {
          handleChange(e);
        }}
        aria-label="text alignment"
        sx={planEffectiveStyle.buttonGrp}
      >
        <ToggleButton value="true" sx={planEffectiveStyle.btnEft}>
          Now
        </ToggleButton>
        <ToggleButton value="false" sx={planEffectiveStyle.btnEft}>
          Next Billing
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
