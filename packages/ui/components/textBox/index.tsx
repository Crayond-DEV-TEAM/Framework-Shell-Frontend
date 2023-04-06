
import { Grid } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TextField, Typography } from "@mui/material";
import type { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { forwardRef, } from 'react';
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { textBoxstyle } from "./style";
import { TextFieldProps } from '@material-ui/core';


export interface TextBoxProps {
    errorMessage: React.ReactNode;
    helperText?: React.ReactNode;
    error?: string | false;
    value?: any;
    autoFocus: boolean | undefined;
    fontSize: string;
    startAdornment: React.ReactNode;
    endAdornment: React.ReactNode;
    InputProps: any;
    autocomplete: any;
    variant: "outlined" | "standard" | "filled" | undefined;
    label?: string,
    id?: string,
    placeholder?: string,
    multiline?: boolean,
    type?: string,
    isReadonly?: boolean,
    onChange?: any,
    isError?: string;
    disabled?: boolean | undefined;
    rowsMax?: number | string;
    sx?: SxProps<Theme>;
}

const getLabel = (props: any) => {
    return (
        <Typography sx={textBoxstyle.Label} noWrap>
            {props.label}
            {props.isrequired && (
                <Typography variant="caption" sx={textBoxstyle.required}>
                    *
                </Typography>
            )}

        </Typography>
    );
};


export const TextBox = forwardRef((props: TextBoxProps): JSX.Element => {

    const
        {
            errorMessage = '',
            helperText = '',
            error = false,
            fontSize = '',
            startAdornment = '',
            endAdornment = '',
            InputProps = '',
            autocomplete = '',
            variant = 'outlined',
            // label = '',
            id = '',
            placeholder = '',
            multiline = false,
            disabled = false,
            type = '',
            isReadonly = '',
            onChange = () => { },
            isError = '',
            rowsMax = '',
            value = '',
            autoFocus = false
        }
            = props;

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });
    return (
        <Box>
            <>
                {getLabel(props)}
                <Box sx={textBoxstyle.text}>
                    <TextField
                        sx={textBoxstyle.textbox}
                        type={type}
                        onKeyPress={(e: any) => {
                            if (type === "number") {
                                if (e.key === "e") {
                                    e.preventDefault();
                                }
                            }
                        }}
                        id={id}
                        placeholder={placeholder}
                        variant={variant ?? "outlined"}
                        fullWidth
                        InputLabelProps={{
                            shrink: false,
                        }}
                        // inputProps={{

                        // }}
                        InputProps={{
                            endAdornment: endAdornment,
                            startAdornment: startAdornment,
                            // readOnly: isReadonly ?? false,
                            // autocomplete: autocomplete,
                            style: {
                                fontSize: fontSize ?? "14px",
                                padding: multiline ? 0 : "none"
                            }
                        }}
                        // disabled={isReadonly ?? false}
                        size="small"
                        multiline={multiline}
                        rows={rowsMax}
                        autoFocus={autoFocus}
                        onChange={onChange}
                        value={value}
                        // error={error}
                        helperText={helperText}
                    />
                </Box>
            </>
            {isError && (
                <Typography variant={"caption"} color={"error"}>
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
});


