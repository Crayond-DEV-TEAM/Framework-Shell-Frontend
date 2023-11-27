import { ClickAwayListener, Tooltip, Typography } from "@mui/material";
import React from "react";

const tooltipStyles = {
    title: {
        fontSize: '13px !important',
        fontWeight: '600 !important',
        whiteSpace: 'wrap !important',
        overflow: 'auto !important',
        textTransform: 'capitalize !important',
        textOverflow: 'inherit !important'
    }
}

export function TooltipComp(props: any): JSX.Element {
    const { value } = props

    const [isTooltip, setIsTooltip] = React.useState({
        description: false
    })

    const handleTooltipOpen = () => {
        setIsTooltip({
            description: true
        })
    }

    const handleTooltipClose = () => {
        setIsTooltip({
            description: false
        })
    }
    return (
        <ClickAwayListener onClickAway={() => handleTooltipClose()}>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                
                onClose={() => handleTooltipClose()}
                open={isTooltip?.description}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                arrow
                placement="bottom"
                title={<Typography sx={tooltipStyles?.title}>{value}</Typography>}
            >
                <Typography sx={{ cursor: 'pointer' }} onClick={() => handleTooltipOpen()}>{value}</Typography>
            </Tooltip>
        </ClickAwayListener>
    )
}