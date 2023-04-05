
import { CheckBox } from '@core/ui/atoms/checkBox';
import { Input } from '@core/ui/atoms/input';
import { Box, FormControlLabel } from '@mui/material';
import { smsDialog_style } from './style';


export function SmsDialog(): JSX.Element {
    return (
        <Box sx={smsDialog_style.leftContent}>
            <Box sx={smsDialog_style.field}>
                <Input header="Provider" value="Provider" />
            </Box>
            <Box sx={smsDialog_style.field}>
                <Input isMulti rowMax={5} header="API Key" />
            </Box>
            <FormControlLabel
                label="Mark As Default"
                control={<CheckBox />}
            />
        </Box>
    );
};


