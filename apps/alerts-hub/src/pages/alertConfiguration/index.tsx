import { AlertConfig } from '@core/ui/components';
import { Box } from '@mui/material';
import { alertConfiguration_style } from './style';

export default function AlertConfiguration() {
    return (
        <Box sx={alertConfiguration_style.root}>
            <AlertConfig />
        </Box>
    )
}