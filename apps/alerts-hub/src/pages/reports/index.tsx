import { Box } from '@mui/material';
import { Reports } from '@core/ui/components';
import { report_Style } from './style'

export default function ReportsHub() {
    return (
        <Box sx={report_Style.root}>
            <Reports />
        </Box>
    )
}