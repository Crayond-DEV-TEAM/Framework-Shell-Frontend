
import type { SxProps, Theme } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { forwardRef, } from 'react';
import { tabs_style } from "./style";


export interface ReportTabsProps {
    data?: any;
    val?: any;
    tabs?: any;
    newValue?: any;
    sx?: SxProps<Theme>;
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

export const ReportTabs = forwardRef((props: ReportTabsProps): JSX.Element => {
    const { tabs = [] } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <Box sx={tabs_style.tabBar}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.length > 0 &&
                        tabs.map((tab: any, i: any) => (
                            <Tab
                                key={i}
                                label={tab?.label}
                            // sx={{ color: disabled === true ? "#B9B9B9" : "" }}
                            />
                        ))}
                </Tabs>
            </Box>
            {tabs.map((tab: any, index: any) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab?.children}
                </TabPanel>
            ))}
        </Box>
    );
});


