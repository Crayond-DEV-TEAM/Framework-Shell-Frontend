import { ClickAwayListener, Tooltip, Typography } from "@mui/material";
import React from "react";

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
                placement="top"
                title={value}
                followCursor
            >
                <Typography sx={{ cursor: 'pointer' }} onClick={() => handleTooltipOpen()}>{value}</Typography>
            </Tooltip>
        </ClickAwayListener>
    )
}