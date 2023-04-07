
import { CheckBox } from '@atoms/checkBox';
import { Input } from '@atoms/input';
import { Box, FormControlLabel } from "@mui/material";
import { emailDialog_style } from './style';

export function EmailDialog(): JSX.Element {

    return (
        <Box sx={emailDialog_style.leftContent}>
            <Box sx={emailDialog_style.field}>
                <Input header="Provider" value="Provider" />
            </Box>
            <Box sx={emailDialog_style.field}>
                <Input isMulti rowMax={5} header="API Key" />
            </Box>
            <FormControlLabel
                label="Mark As Default"
                control={<CheckBox />}
            />
        </Box>
    );
};


