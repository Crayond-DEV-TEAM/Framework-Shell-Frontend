
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
    const [index, setIndex] = React.useState(0);


    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const handleTabChange = (i: any) => {
        setIndex(i)
    }

    return (
        <Box sx={tabs_style.tabBar}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.length > 0 &&
                        tabs.map((tab: any, i: any) => {
                            return (
                                <Typography
                                    onClick={() => handleTabChange(i)}
                                    key={i}
                                    pt={2}
                                    pb={2}
                                    sx={
                                        i === index
                                            ? tabs_style.alertConfigTabTxt
                                            : tabs_style.alertConfigTab
                                    }
                                // sx={{ color: disabled === true ? "#B9B9B9" : "" }}
                                >
                                    {tab?.label}
                                </Typography>
                            )
                        })}
                </Tabs>
            </Box>
            {/* {
                tabs?.map((tab: any, index: any) => {
                    console.log("tab card", tab);
                    return ( */}
                        <TabPanel>
                            {index === 0 && <Box>{tabs[0]?.children}</Box>}
                            {index === 1 && <Box>{tabs[1]?.children}</Box>}
                            {index === 2 && <Box>{tabs[2]?.children}</Box>}
                        </TabPanel>
                    {/* )
                })
            } */}
        </Box>
    );
});

