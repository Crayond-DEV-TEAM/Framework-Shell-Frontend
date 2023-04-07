import { Box } from '@mui/material';
import { AlertRules } from '@core/ui/components/alertRules';
import { alertRule_Style } from './style'

export default function AlertRule() {
    return (
        <Box sx={alertRule_Style.root}>
            <AlertRules />
        </Box>
    )
}