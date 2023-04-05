
// import { Grid } from '@mui/material';
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import { TextField, Typography } from "@mui/material";
// import type { SxProps, Theme } from '@mui/material';
// import Box from '@mui/material/Box';
// import { Stack } from '@mui/material';
// import { forwardRef, } from 'react';
// import { styled } from "@mui/material/styles";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import { textBoxstyle } from "./style";
// import { TextFieldProps } from '@material-ui/core';


// export interface TextBoxProps {
//     errorMessage: React.ReactNode;
//     helperText?: React.ReactNode;
//     error?: string;
//     value?: any;
//     autoFocus: boolean | undefined;
//     fontSize: string;
//     startAdornment: React.ReactNode;
//     InputProps: any;
//     autocomplete: any;
//     variant: "outlined" | "standard" | "filled" | undefined;
//     label?: string,
//     id?: string,
//     placeholder?: string,
//     multiline?: boolean,
//     type?: string,
//     isReadonly?: boolean,
//     onChange?: any,
//     isError?: string;
//     rowsMax?: number | string;
//     sx?: SxProps<Theme>;
// }

// const getLabel = (props: any) => {
//     return (
//         <Typography sx={textBoxstyle.Label} noWrap>
//             {props.label}
//             {props.isrequired && (
//                 <Typography variant="caption" sx={textBoxstyle.required}>
//                     *
//                 </Typography>
//             )}

//         </Typography>
//     );
// };


// export const TextBox = forwardRef((props: TextBoxProps): JSX.Element => {

//     const
//         errorMessage = '',
//         helperText = '',
//         error = false,
//         fontSize = '',
//         startAdornment = '',
//         InputProps = '',
//         autocomplete = '',
//         variant = '',
//         label = '',
//         id = '',
//         placeholder = '',
//         multiline = false,
//         type = '',
//         isReadonly = '',
//         onChange = () => { },
//         isError = '',
//         rowsMax = 5,
//         autoFocus
//             = props

//     const [values, setValues] = React.useState({
//         password: "",
//         showPassword: false,
//     });
//     return (
//         <Box>
//             <>
//                 {getLabel(props)}
//                 <Box sx={textBoxstyle.text}>
//                     <TextField
//                         sx={textBoxstyle.textbox}
//                         type={props.type}
//                         onKeyPress={(e: any) => {
//                             if (props.type === "number") {
//                                 if (e.key === "e") {
//                                     e.preventDefault();
//                                 }
//                             }
//                         }}
//                         id={props.id}
//                         placeholder={props.placeholder}
//                         variant={props.variant ?? "outlined"}
//                         fullWidth
//                         InputLabelProps={{
//                             shrink: false,
//                         }}
//                         inputProps={{
//                             readOnly: props?.isReadonly ?? false,
//                             autocomplete: props?.autocomplete
//                         }}
//                         InputProps={{
//                             endAdornment: props?.InputProps?.endAdornment,
//                             startAdornment: props?.startAdornment,
//                             style: {
//                                 fontSize: props?.fontSize ?? "14px",
//                                 padding: props.multiline ? 0 : "none"
//                             }
//                         }}
//                         disabled={props?.isReadonly ?? false}
//                         size="small"
//                         multiline={props.multiline}
//                         rows={3}
//                         autoFocus={props?.autoFocus}
//                         onChange={props.onChange}
//                         value={props.value}
//                         error={props?.error}
//                         helperText={props.helperText}
//                     />
//                 </Box>
//             </>
//             {props.isError && (
//                 <Typography variant={"caption"} color={"error"}>
//                     {props.errorMessage}
//                 </Typography>
//             )}
//         </Box>
//     );
// });


