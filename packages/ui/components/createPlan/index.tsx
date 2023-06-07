import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createPlanStyle } from './style';
import TextField from '@mui/material/TextField';
import { CustomToggle } from '@atoms/customToggle';
import { AddOnsCard, BackgroundPaper, ButtonGroupDropdown, CreatePlanCard } from '..';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { CustomerHeader } from '@atoms/customerHeader';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CloseRedIcon } from '@atoms/icons';

export interface CreatePlanProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CreatePlan = (props: CreatePlanProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const navigate = useNavigate();

  const onchangeRoute = () => {
    navigate(planSubscriptionRoutes.plan);
  };
  const Money = [{ label: '10' }, { label: '19' }];
  const SqureText = [
    { text: 'List this plan in the public portal' },
    { text: 'Make this a recommended plan' },
    { text: 'Enable metered billing' },
    { text: 'Active this paln' },
  ];
  const ListAddons = [{ subTitle: 'Users' }, { subTitle: 'Customized metrics' }];

  return (
    <Box
      sx={[
        {
          ...createPlanStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <CustomerHeader isback={false} title={' Create New Customer'} onSave={onchangeRoute} onCancel={onchangeRoute} />
      <Box sx={{ margin: '45px' }} />
      {/* <CreatePlanCard title="General" subTitle="Users" /> */}
      <Box sx={createPlanStyle.content}>
        <CustomerCardComponent
          title={'Basic Details'}
          sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          body={
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={createPlanStyle.inputGroupSx}>
                  <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                    Plan Name
                  </Label>
                  <Input
                    size="small"
                    placeholder="Plan Name"
                    // value={groupState?.title}
                    id="title"
                    // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    //   handleChange('title', e?.target?.value)
                    // }
                    textFieldStyle={createPlanStyle.inputSx}
                    // isError={groupState?.error?.addTitle ? true : false}
                    // errorMessage={groupState?.error?.addTitle ?? ''}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={createPlanStyle.inputGroupSx}>
                  <Label sx={createPlanStyle.labelSx} rootStyle={{ mb: '1' }} htmlFor="addTitle" isRequired>
                    Description
                  </Label>
                  <Input
                    size="small"
                    // placeholder="Description"
                    // value={groupState?.title}
                    // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    //   handleChange('title', e?.target?.value)
                    // }
                    rows={3}
                    rowsMax={6}
                    isMulti={true}
                    textFieldStyle={createPlanStyle.inputSx}
                    required
                    id="description"
                    // isError={groupState?.error?.addTitle ? true : false}
                    // errorMessage={groupState?.error?.addTitle ?? ''}
                  />
                </Box>
              </Grid>
              {SqureText.map((x, index) => {
                return (
                  <Grid item key={index}>
                    <CustomCheckboxWithLabels squareCheckbox={true} squareText={x.text} />
                  </Grid>
                );
              })}
            </Grid>
          }
        />
        <BackgroundPaper
          title="Pricing"
          content={
            <>
              <Grid container spacing={2}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                      Billing Period
                    </Label>
                    <CustomToggle tabOne={'Monthly'} tabTwo={'Yearly'} />
                  </Box>
                </Grid>
                <Grid item xs={7.5} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                      Set Price
                    </Label>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ButtonGroupDropdown permissionList={Money} BtnName={'Monthly'} />
                      <ButtonGroupDropdown permissionList={Money} BtnName={'Yearly'} />
                      <CustomCheckboxWithLabels circleCheckbox={true} circleText={'Per user'} />
                      <CustomCheckboxWithLabels circleCheckbox={true} circleText={'Flat fee'} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                      Billing cycles
                    </Label>
                    <CustomToggle tabOne={'Fixed'} tabTwo={'Forever'} />
                  </Box>
                </Grid>
              </Grid>
            </>
          }
        />
        <BackgroundPaper
          title="Feature set and controls"
          content={<CreatePlanCard title="General" subTitle="Users" />}
        />
        <BackgroundPaper title="Add-ons" content={<AddOnsCard ListAddons={ListAddons} />} />
        <BackgroundPaper
          title="Charges"
          content={
            <Box>
              <Box sx={createPlanStyle.align}>
                <Typography sx={createPlanStyle.firstTextdark}>{'Implementation Charge'}</Typography>
                <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
              </Box>
              <Box sx={createPlanStyle.inputGroupSx}>
                <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                  Set price
                </Label>
                <Input
                  value={'10'}
                  textFieldStyle={{ width: '160px', height: '40px' }}
                  endAdornment={
                    <AttachMoneyIcon
                      sx={{
                        '& .MuiSvgIcon-root': {
                          width: '25px',
                          height: '20px',
                          color: '#000000',
                        },
                      }}
                    />
                  }
                />
              </Box>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};
