
import { Grid, SxProps, Theme } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { forwardRef, } from 'react';
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// import { TextBox } from '@core/ui/components/textBox';
import { popup_style } from './style'


export interface PopupProps {
    handleSubmit: React.MouseEventHandler<HTMLSpanElement> | undefined;
    handleClose: React.MouseEventHandler<HTMLSpanElement> | undefined;
    data?: any;
    value?: any;
    updateState?: any;
    tabs?: any;
    newValue?: any;
    sx?: SxProps<Theme>;
    error?: string;
}

export const Popup = forwardRef((props: PopupProps): JSX.Element => {

    const IOSSwitch = styled((props: any) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
        />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#2ECA45" : "#464775",
                    opacity: 1,
                    border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: "#33cf4d",
                border: "6px solid #fff",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
                color:
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 22,
            height: 22,
        },
        "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === "light" ? "#707070" : "#39393D",
            opacity: 1,
            transition: theme.transitions.create(["background-color"], {
                duration: 500,
            }),
        },
    }));

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <FormGroup>
                        <Stack direction="row" spacing={2}>
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} checked={props?.data?.isActive} onChange={(value: any) => props?.updateState("isActive", value.target.checked)} />}
                                label="is Active"
                            />
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} checked={props?.data?.is_push} onChange={(value: any) => props?.updateState("is_push", value.target.checked)} />}
                                label="Push"
                            />
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} checked={props?.data?.is_email} onChange={(value: any) => props?.updateState("is_email", value.target.checked)} />}
                                label="E-mail"
                            />
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} checked={props?.data?.is_sms} onChange={(value: any) => props?.updateState("is_sms", value.target.checked)} />}
                                label="SMS"
                            />
                        </Stack>
                    </FormGroup>
                    <Box>
                        <Box sx={popup_style.addRuleLabel}>
                            <Typography>
                                Alert Rule Code<span>*</span>
                            </Typography>
                        </Box>
                        <Box>
                            {/* <TextBox
                                label=""
                                placeholder="Alert Code"
                                value={props?.data?.alert_code}
                                onChange={(value: any) => props?.updateState("alert_code", value.target.value)} errorMessage={undefined} autoFocus={undefined} fontSize={''} startAdornment={undefined} InputProps={undefined} autocomplete={undefined} variant={undefined} />
                            <TextBox
                                label=""
                                placeholder="Reference ID"
                                value={props?.data?.reference_id}
                                onChange={(value: any) => props?.updateState("reference_id", value.target.value)} errorMessage={undefined} autoFocus={undefined} fontSize={''} startAdornment={undefined} InputProps={undefined} autocomplete={undefined} variant={undefined} />
                            <TextBox
                                label=""
                                placeholder="Hashtags"
                                value={props?.data?.hashtags}
                                onChange={(value: any) => props?.updateState("hashtags", value.target.value)} errorMessage={undefined} autoFocus={undefined} fontSize={''} startAdornment={undefined} InputProps={undefined} autocomplete={undefined} variant={undefined} />
                            <TextBox
                                label=""
                                placeholder="Description"
                                value={props?.data?.description}
                                onChange={(value: any) => props?.updateState("description", value.target.value)} errorMessage={undefined} autoFocus={undefined} fontSize={''} startAdornment={undefined} InputProps={undefined} autocomplete={undefined} variant={undefined} /> */}
                        </Box>
                        <Stack
                            direction="row"
                            justifyContent="end"
                            mb={2}
                            sx={popup_style.btns}
                        >
                            <Typography onClick={props?.handleClose} sx={popup_style.btnone}>Cancel</Typography>
                            <Typography onClick={props?.handleSubmit} sx={popup_style.btn2}>
                                Submit
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
});


