import CopyIcon from "@core/ui/assets/copyIcon";
import EditIMG from "@core/ui/assets/edit";
import InfoIcon from "@core/ui/assets/infoIcon";
import LockKey from "@core/ui/assets/lockKey";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
    Avatar, Box, Button,
    Checkbox, IconButton, MenuItem, Popover, TableRow, Typography
} from '@mui/material';
import Menu from "@mui/material/Menu";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import React from 'react';
import type { SxProps, Theme } from '@mui/material';
// import { enumName } from "../../utils";
// import moment from "moment-timezone";
// import ReactQuill from "react-quill";
import { tableWithPagination_style } from './style';

export interface TableWithPaginationProps {
    handleLink(data: any): void;
    tableType: string;
    isColor: boolean;
    onClick(row: any): void;
    onUnitClick(main: any, arg1: string): void;
    anchorEl: Element | ((element: Element) => Element) | null | undefined;
    open: boolean;
    id: string | undefined;
    handleHover(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, main: any): void;
    delete: React.ReactNode;
    dataType?: any;
    view?: any;
    e?: any;
    value?: any;
    handleIcon?: any;
    heading?: any;
    height?: any;
    edit?: JSX.Element;
    data?: any;
    roles: any;
    style?: React.ReactNode;
    handleClose: () => void | undefined;
    rows: any;
    parameter: any,
    type: any,
    size?: string;
    sx?: SxProps<Theme> | undefined
    description: any;
    component?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    scope?: React.ReactNode;
    path?: React.ReactNode;
    showpagination?: React.ReactNode;
}


export function TableWithPagination(props: TableWithPaginationProps): JSX.Element {

    //   const totalCount = props?.totalRowsCount > -1 ? props?.totalRowsCount : "";
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [index, setIndex] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const modules = {
        toolbar: false,
    };
    const getComponentType = (val: any, data: any) => {
        const main = data.main;
        switch (data.type) {
            case "status": {
                if (data.value === "Approved") {
                    return <p style={{ color: "#267C24", margin: "0" }}>{data.value}</p>;
                } else if (data.value === "Rejected") {
                    return <p style={{ color: "red", margin: "0" }}>{data.value}</p>;
                } else if (data.value === "Pending") {
                    return <p style={{ color: "#78B1FE", margin: "0" }}>{data.value}</p>;
                    // } else if (data.value === "Lost Lead") {
                    //   return <p style={{ color: "red", margin: '0' }}>{data.value}</p>;
                } else if (data.value === "Lost Lead") {
                    return <p style={{
                        color: 'white',
                        backgroundColor: 'red',
                        fontSize: '14px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        padding: '4px',
                    }}>{data.value}</p>;
                } else if (data.value === "In Progress") {
                    return (
                        <Typography sx={tableWithPagination_style.green} width="max-content">
                            {data.value}
                        </Typography>
                    );
                } else if (data.value === "Converted") {
                    return <p style={{
                        color: 'white',
                        backgroundColor: '#78B1FE',
                        fontSize: '14px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        padding: '4px',
                    }}>{data.value}</p>;
                } else if (data.value === "Cancelled") {
                    return <p style={{ color: "#98A0AC", margin: "0" }}>{data.value}</p>;
                } else if (data.value === "Yet To Activate") {
                    return <p style={{ color: "#FF9340", margin: "0" }}>{data.value}</p>;
                } else if (data.value === "Active") {
                    return <p style={{ color: "#11AA00", margin: "0" }}>{data.value}</p>;
                } else if (data.value === "InActive") {
                    return <p style={{ color: "#FF4B4B", margin: "0" }}>{data.value}</p>;
                } else if (data.value === "Quote Accepted") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#5AC782",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data?.value === "open") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#5AC782",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data.value === "close" || data?.value === "closed") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#CED3DD",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data?.value === "Closed") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "red",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                                padding: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data?.value === "Open") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#5AC782",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                                padding: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data.value === "requested for visit") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#FF9340",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data.value === "requested for re-quote accepted") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#FF9340",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data.value === "inProgress") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#78B1FE",
                                fontSize: "14px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data.value === "In Progress") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#78B1FE",
                                fontSize: "14px",
                                textAlign: "center",
                                borderRadius: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data.value === "Active") {
                    return (
                        <Typography sx={tableWithPagination_style.green}>{data.value}</Typography>
                    );
                } else if (data.value === "Paid") {
                    return (
                        <Typography sx={tableWithPagination_style.active}>{data.value}</Typography>
                    );
                } else if (data?.value === "Vacant") {
                    return <span style={{
                        color: 'white',
                        backgroundColor: '#5AC782',
                        fontSize: '14px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        padding: '4px',
                    }}>{data.value}</span>;
                } else if (data?.value === "Occupied") {
                    return <span style={{
                        color: 'white',
                        backgroundColor: 'red',
                        fontSize: '14px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        padding: '4px',
                    }}>{data.value}</span>;
                } else if (data.value === "Inactive") {
                    return <Typography sx={tableWithPagination_style.red}>{data.value}</Typography>;
                } else if (data.value === "Unpaid") {
                    return <Typography sx={tableWithPagination_style.red}>{data.value}</Typography>;
                } else if (data.value === "delete") {
                    return (
                        <div>
                            {props?.delete && (
                                <IconButton onClick={() => props.handleIcon("delete", main)}>
                                    <DeleteForeverIcon color="primary" />
                                </IconButton>
                            )}
                        </div>
                    );
                } else if (data.value === true) {
                    return <Typography sx={tableWithPagination_style.active}>Active</Typography>;
                } else if (data.value === false) {
                    return <Typography sx={tableWithPagination_style.inactive}>Inactive</Typography>;
                } else {
                    return data.value;
                }
            }
            case "status2": {
                if (data?.value === "Closed") {
                    return (
                        <Typography
                            sx={{
                                color: "#000",
                                backgroundColor: "#F2F4F7",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                                padding: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data?.value === "Open") {
                    return (
                        <Typography
                            sx={{
                                color: "white",
                                backgroundColor: "#5AC782",
                                fontSize: "10px",
                                textAlign: "center",
                                borderRadius: "4px",
                                padding: "4px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else {
                    return data.value;
                }
            }
            case "maintenanceRequestStatus": {
                if (data?.value === "Closed") {
                    return (
                        <Typography sx={tableWithPagination_style.green}>{data.value}</Typography>
                    );
                } else if (data?.value === "Open") {
                    return <Typography sx={tableWithPagination_style.red}>{data.value}</Typography>;
                } else {
                    return data.value;
                }
            }
            case "object_status": {
                // if (data?.value.value === enumName.approved) {
                //     return (
                //         <Typography
                //             sx={{
                //                 color: "#5AC782",
                //                 fontSize: "14px",
                //             }}
                //         >
                //             {data.value.label}
                //         </Typography>
                //     );
                // } else if (data?.value.value === enumName.cancelled) {
                //     return (
                //         <Typography
                //             sx={{
                //                 color: "#4E5A6B",
                //                 fontSize: "14px",
                //             }}
                //         >
                //             {data.value.label}
                //         </Typography>
                //     );
                // } else if (data?.value.value === enumName.pending) {
                //     return (
                //         <Typography
                //             sx={{
                //                 color: "#FF9340",
                //                 fontSize: "14px",
                //             }}
                //         >
                //             {data.value.label}
                //         </Typography>
                //     );
                // } else if (data?.value.value === enumName.rejected) {
                //     return (
                //         <Typography
                //             sx={{
                //                 color: "#FF4B4B",
                //                 fontSize: "14px",
                //             }}
                //         >
                //             {data.value.label}
                //         </Typography>
                //     );
                // } else {
                //     return data.value;
                // }
            }
            case "icon": {
                let editviewtoggle = (
                    <div style={{ display: "flex" }}>
                        {props?.edit && (
                            <IconButton onClick={() => props.handleIcon("edit", main)}>
                                <EditIMG color="#98a0ac" />
                            </IconButton>
                        )}
                        {props?.view && (
                            <IconButton onClick={() => props.handleIcon("view", main)}>
                                <RemoveRedEyeOutlinedIcon
                                    sx={{ fontSize: "16px", color: "#98A0AC" }}
                                />
                            </IconButton>
                        )}

                        {props?.edit && (
                            <Switch
                                checked={data.is_active}
                                onChange={(e: any) =>
                                    props.handleIcon("toggle", main, e.target.checked)
                                }
                            />
                        )}
                    </div>
                );
                let editview = (
                    <div style={{ display: "flex" }}>
                        {props?.edit && (
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleIcon("edit", main);
                                }}
                            >
                                <EditIMG color="#98a0ac" />
                            </IconButton>
                        )}
                        {props?.view && (
                            <IconButton onClick={() => props.handleIcon("view", main)}>
                                <RemoveRedEyeOutlinedIcon
                                    sx={{ fontSize: "16px", color: "#98A0AC" }}
                                />
                            </IconButton>
                        )}
                    </div>
                );
                let deleteIcon = (
                    <div style={{ display: "flex" }}>
                        {props?.delete && (
                            <IconButton onClick={() => props.handleIcon("delete", main)}>
                                <DeleteOutlineIcon
                                    sx={{ fontSize: "16px", color: "#98A0AC" }}
                                />
                            </IconButton>
                        )}
                    </div>
                );
                let viewdelete = (
                    <div style={{ display: "flex" }}>
                        {props?.edit && (
                            <IconButton onClick={() => props.handleIcon("edit", main)}>
                                <EditIMG color="#98a0ac" />
                            </IconButton>
                        )}
                        {props?.delete && (
                            <IconButton onClick={() => props.handleIcon("delete", main)}>
                                <DeleteOutlineIcon
                                    sx={{ fontSize: "16px", color: "#98A0AC" }}
                                />
                            </IconButton>
                        )}
                    </div>
                );
                let edittoggle = (
                    <div style={{ display: "flex" }}>
                        {props?.edit && (
                            <IconButton
                                onClick={() => props.handleIcon("edit", main, props?.edit)}
                            >
                                <EditIMG color="#98a0ac" />
                            </IconButton>
                        )}
                        {props?.edit && (
                            <Switch
                                checked={main.is_active}
                                onChange={(e) => props.handleIcon("toggle", main, props?.edit)}
                            />
                        )}
                    </div>
                );
                let viewedittoggle = (
                    <div style={{ display: "flex" }}>
                        {props?.edit && (
                            <IconButton
                                onClick={() => props.handleIcon("edit", main, props?.edit)}
                            >
                                <EditIMG color="#98a0ac" />
                            </IconButton>
                        )}
                        {props?.view && (
                            <IconButton
                                onClick={() => props.handleIcon("view", main, props?.view)}
                            >
                                <RemoveRedEyeOutlinedIcon
                                    sx={{ fontSize: "16px", color: "#98A0AC" }}
                                />
                            </IconButton>
                        )}
                        {props?.edit && (
                            <Switch
                                checked={main.is_active}
                                onChange={(e) => props.handleIcon("toggle", main, props?.edit)}
                            />
                        )}
                    </div>
                );

                if (data.icon === "editviewtoggle") {
                    return editviewtoggle;
                }
                if (data.icon === "deleteIcon") {
                    return deleteIcon;
                }
                if (data.icon === "viewedittoggle") {
                    return viewedittoggle;
                }
                if (data.icon === "edittoggle") {
                    return edittoggle;
                }
                if (data.icon === "viewdelete") {
                    return viewdelete;
                }
                if (data.icon === "editview") {
                    return editview;
                } else if (data.icon === "edit") {
                    return (
                        <div>
                            {props?.edit && (
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.handleIcon("edit", main, props?.edit);
                                    }}
                                >
                                    <EditIMG color="#98a0ac" />
                                </IconButton>
                            )}
                        </div>
                    );
                } else if (data.icon === "view") {
                    return (
                        <div>
                            {props?.view && (
                                <IconButton onClick={() => props.handleIcon("view", main)}>
                                    <RemoveRedEyeOutlinedIcon
                                        sx={{ fontSize: "16px", color: "#98A0AC" }}
                                    />
                                </IconButton>
                            )}
                        </div>
                    );
                } else if (data.icon === "arrow") {
                    return (
                        <div style={{ display: "flex" }}>
                            <IconButton size="small" sx={tableWithPagination_style.arrow}>
                                {/* <ArrowForwardIosIcon
                                    size="small"
                                    style={{ fontSize: "16px" }}
                                /> */}
                            </IconButton>
                        </div>
                    );
                }

                break;
            }
            case "leadEdit": {
                return (
                    <>
                        {props?.view && (
                            <IconButton onClick={() => props.handleIcon("view", main)}>
                                <RemoveRedEyeOutlinedIcon
                                    sx={{ fontSize: "16px", color: "#98A0AC" }}
                                />
                            </IconButton>
                        )}
                    </>
                );
            }
            case "propertyType": {
                return (
                    <>
                        {data.value && (
                            <Typography
                                sx={{
                                    color: "white",
                                    backgroundColor: "#78B1FE",
                                    fontSize: "14px",
                                    textAlign: "center",
                                    borderRadius: "4px",
                                    display: "inline-block",
                                }}
                            >
                                &nbsp;&nbsp;&nbsp;{data.value}&nbsp;&nbsp;&nbsp;
                            </Typography>
                        )}
                    </>
                );
            }
            case "blockType": {
                return (
                    <>
                        {data.value && (
                            <Typography
                                sx={{
                                    color: "white",
                                    backgroundColor: "#78B1FE",
                                    fontSize: "14px",
                                    textAlign: "center",
                                    borderRadius: "4px",
                                    display: "inline-block",
                                }}
                            >
                                &nbsp;&nbsp;&nbsp;{data.value}&nbsp;&nbsp;&nbsp;
                            </Typography>
                        )}
                    </>
                );
            }
            case "checkBox": {
                return (
                    <div>
                        {props?.edit && (
                            <Checkbox
                                sx={{ padding: "0px" }}
                                onChange={(e: any) =>
                                    props.handleIcon("checkBox", main, e?.target?.checked)
                                }
                                color="success"
                                checked={data.value}
                                checkedIcon={<CheckCircleIcon />}
                                icon={<CircleOutlinedIcon style={{ color: "#c1c1c1" }} />}
                            />
                        )}
                    </div>
                );
            }
            case "tooltip": {
                return (
                    <>
                        <Button
                            aria-describedby={props?.id}
                            sx={tableWithPagination_style.tooltip}
                            onClick={(e) => props?.handleHover(e, main)}
                        // onMouseLeave={props?.handleClose}
                        >
                            {data.value}
                        </Button>
                        <Popover
                            // sx={{
                            //     boxShadow: "none !important",
                            //     tableWithPagination_style.menu
                            // }}
                            id={props?.id}
                            open={props?.open}
                            anchorEl={props?.anchorEl}
                            onClose={props?.handleClose}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            {props?.roles?.map((val: any) => {
                                return <Typography sx={{ p: 1 }}>{val?.name}</Typography>;
                            })}
                        </Popover>
                    </>
                );
            }
            case "avatar": {
                return (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={data.image} sx={{ width: 34, height: 34 }} />
                        <Typography style={{ marginLeft: 10 }}>{data.value}</Typography>
                    </Box>
                );
            }
            case "avatarText": {
                return (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            src={data.value.image}
                            sx={{ width: 34, height: 34, lineHeight: 0, fontSize: 14 }}
                        >
                            {data?.value?.name ? data?.value?.name?.charAt(0) : ""}
                        </Avatar>
                        <Typography style={{ marginLeft: 10 }}>
                            {data.value.name}
                        </Typography>
                    </Box>
                );
            }
            case "avatarmanagement": {
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={data.value} sx={{ width: 34, height: 34 }} />
                    </div>
                );
            }
            case "text": {
                return (
                    <Typography
                        style={{
                            whiteSpace: "nowrap",
                        }}
                        sx={tableWithPagination_style.text}
                    >
                        {data.value ?? "-"}
                    </Typography>
                );
            }
            case "textObject": {
                return (
                    <Typography
                        style={{
                            whiteSpace: "nowrap",
                        }}
                        sx={tableWithPagination_style.text}
                    >
                        {data?.value?.label ?? "-"}
                    </Typography>
                );
            }
            case "textLink": {
                return (
                    <Box
                        onClick={() => props?.onUnitClick(main, data)}
                        sx={{ textDecorationLine: "underline", color: "blue" }}
                    >
                        {data.value}
                    </Box>
                );
            }
            case "increment": {
                return data.index + 1;
            }
            case "image": {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <img src={data.image} alt={data.name}></img>
                        <Typography style={{ marginLeft: 10 }}>{data.value}</Typography>
                        {/* <Typography sx={tableWithPagination_style.change}>Change</Typography> */}
                    </Box>
                );
            }
            case "PFImage": {
                return (
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            src={data.value !== "" ? data.value : "/images/pf.svg"}
                            sx={{ width: 34, height: 34 }}
                        />
                    </Box>
                );
            }
            case "logo": {
                return (
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            src={data?.value?.logo}
                            sx={{ width: 34, height: 34, lineHeight: 0, fontSize: 14 }}
                        >
                            {data?.value?.name ? data?.value?.name?.charAt(0) : ""}
                        </Avatar>
                    </Box>
                );
            }
            case "link": {
                return (
                    <Typography
                        sx={tableWithPagination_style.link}
                        onClick={() => props?.handleLink(data)}
                    >
                        {main.url}
                    </Typography>
                );
            }
            case "date": {
                return (
                    <Typography
                        sx={tableWithPagination_style.text}
                    >
                        {/* {data.value
                            ? moment(data.value).tz(moment.tz.guess()).format("DD MMM YYYY")
                            : "-"} */}
                    </Typography>
                );
            }
            case "description": {
                return (
                    <div>
                        {/* <Typography
                            noWrap
                            readOnly
                            sx={tableWithPagination_style.text}
                        >
                            {data?.value?.length > 0
                                ? `${data?.value?.substring(0, 15)}${data?.value?.length > 15 ? "..." : ""
                                } `
                                : "-"}
                        </Typography> */}
                    </div>
                );
            }
            case "quill": {
                return (
                    <Box>
                        {/* <ReactQuill
                            noWrap
                            readOnly
                            theme="bubble"
                            // value={data?.value ?? ""}
                            value={
                                data?.value?.length > 0
                                    ? `${data?.value?.substring(0, 100)}${data?.value?.length > 10 ? "..." : ""
                                    } `
                                    : "-"
                            }
                            modules={modules}
                            sx={tableWithPagination_style.text}
                            sx={{
                                // wordBreak: "break-all",
                                overflowWrap: "anywhere",
                                width: "max-content",
                            }}
                        /> */}
                    </Box>
                );
            }
            case "redirect": {
                return (
                    <a target="_blank" href={data.value}>
                        {data.value}
                    </a>
                );
            }
            case "object": {
                return data.value[data?.objectOption] ?? "-";
            }
            case "phone": {
                return (
                    <>
                        {main.code} {main.mobile}
                    </>
                );
            }
            case "more": {
                return (
                    <Box
                        style={{ display: props?.edit || props?.delete ? "flex" : "none" }}
                    >
                        <IconButton
                            sx={tableWithPagination_style.moreBtn}
                            onClick={(e: any) => {
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>

                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                {props?.edit && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("edit", main);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Edit
                                    </MenuItem>
                                )}
                                {props?.edit && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("active", main, main.status);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        {main.status === "Active" || main.is_active === true
                                            ? "In-active"
                                            : "Active"}
                                    </MenuItem>
                                )}

                                {props?.delete && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("delete", main, main.delete);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Delete
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </Box>
                );
            }
            case "more_2": {
                return (
                    <Box
                        style={{ display: props?.edit || props?.delete ? "flex" : "none" }}
                    >
                        <IconButton
                            sx={tableWithPagination_style.moreBtn}
                            onClick={(e: any) => {
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>

                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                {props?.edit && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("edit", main);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Edit
                                    </MenuItem>
                                )}
                                {props?.delete && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("delete", main);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Delete
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </Box>
                );
            }
            case "more_3": {
                return (
                    <Box
                        style={{ display: props?.edit || props?.delete ? "flex" : "none" }}
                    >
                        <IconButton
                            sx={tableWithPagination_style.moreBtn}
                            onClick={(e: any) => {
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>

                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                {props?.edit && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("active", main, main.status);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        {main.status === "Active" ? "In-active" : "Active"}
                                    </MenuItem>
                                )}

                                {props?.delete && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("delete", main, main.delete);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Delete
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </Box>
                );
            }
            case "more_4": {
                return (
                    <Box style={{ display: props?.edit ? "flex" : "none" }}>
                        <IconButton
                            sx={tableWithPagination_style.moreBtn}
                            onClick={(e: any) => {
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>
                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                {props?.edit && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("edit", main);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Edit
                                    </MenuItem>
                                )}
                                {props?.edit && (
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            props.handleIcon("active", main, main.status);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        {main.status === "Active" ? "In-active" : "Active"}
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </Box>
                );
            }
            case "more_5": {
                return (
                    <Box style={{ display: props?.edit ? "flex" : "none" }}>
                        <IconButton
                            sx={tableWithPagination_style.moreBtn}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>

                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                {" "}
                                {props?.edit && (
                                    <MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClose();
                                            props.handleIcon("edit", main);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Edit
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </Box>
                );
            }
            case "view_more": {
                return (
                    <Box>
                        <IconButton
                            sx={tableWithPagination_style.moreBtn}
                            onClick={(e: any) => {
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>

                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        props.handleIcon("active", main, main.status);
                                    }}
                                    sx={tableWithPagination_style.menuItem}
                                >
                                    {main.is_active ? "In-active" : "Active"}
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        props.handleIcon("view", main, main.delete);
                                    }}
                                    sx={tableWithPagination_style.menuItem}
                                >
                                    View
                                </MenuItem>
                            </Menu>
                        )}
                    </Box>
                );
            }
            case "error_icon": {
                return (
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            transform: "rotate(180deg)",
                        }}
                    >
                        {main.iconToolTip && (
                            // <InfoIcon
                            //     fill="#FF4B4B"
                            //     hoverFill="#FF4B4B"
                            //     info={main.iconToolTip}
                            // />
                            <>
                            </>
                        )}
                    </Box>
                    // {main?.iconToolTip && <LightTooltip title={main.iconToolTip} placement="top">
                    //    {/* <ErrorOutlineIcon /> */}
                    //    <InfoIcon fill="#FF4B4B" />
                    //  </LightTooltip>}
                );
            }
            case "block": {
                return (
                    <Box
                        onClick={() => props?.onUnitClick(main, "block")}
                        sx={{ textDecorationLine: "underline", color: "blue" }}
                    >
                        {data.value}
                    </Box>
                );
            }
            case "unit": {
                return (
                    <Box
                        onClick={() => props?.onUnitClick(main, "unit")}
                        sx={{ textDecorationLine: "underline", color: "blue" }}
                    >
                        {data.value}
                    </Box>
                );
            }
            case "floor": {
                return (
                    <Box
                        onClick={() => props?.onUnitClick(main, "floor")}
                        sx={{ textDecorationLine: "underline", color: "blue" }}
                    >
                        {data.value}
                    </Box>
                );
            }
            case "active": {
                return (
                    <>
                        {data.value ? (
                            <Typography sx={tableWithPagination_style.activego}>Active</Typography>
                        ) : (
                            <Typography sx={tableWithPagination_style.inactivego}>Active</Typography>
                        )}
                    </>
                );
            }
            case "info": {
                return (
                    <Box sx={{ display: props?.view ? "flex" : "none" }}>
                        {props?.view && (
                            <IconButton onClick={() => props.handleIcon("info", main)}>
                                <InfoOutlinedIcon sx={tableWithPagination_style.infoIcon} />
                            </IconButton>
                        )}
                    </Box>
                );
            }
            case "payment_status": {
                return (
                    <>
                        {data.value === "Close" ? (
                            <Typography sx={tableWithPagination_style.inactivego}>Close</Typography>
                        ) : (
                            <Typography sx={tableWithPagination_style.inprogress}>
                                In Progress
                            </Typography>
                        )}
                    </>
                );
            }
            case "q_status": {
                return (
                    <>
                        {
                            <Typography
                            // sx={
                            //     (data.value === "Won" && tableWithPagination_style.green) ||
                            //     (data.value === "Active" && tableWithPagination_style.yellow) ||
                            //     (data.value === "InActive" && tableWithPagination_style.red)
                            // }
                            >
                                {data.value}
                            </Typography >
                        }
                    </>
                );
            }

            // INSPECTION START

            case "inspection_status": {
                return (
                    <Box>
                        {props?.edit && data.value === "Yet To Assign" ? (
                            <Box flexGrow={1} display="flex" alignItems="center">
                                <Box>
                                    <Typography sx={tableWithPagination_style.yet}>{data.value}</Typography>
                                </Box>
                                <Box marginLeft="30px">
                                    <Button
                                        sx={{ boxShadow: "none" }}
                                        onClick={() => props.handleIcon("assign", data)}
                                        variant="contained"
                                    >
                                        Assign
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Typography
                                sx={
                                    data.value === "Assigned"
                                        ? tableWithPagination_style.assignstatus
                                        : tableWithPagination_style.completeStatus
                                }
                            >
                                {data.value}
                            </Typography>
                        )}
                    </Box>
                );
            }
            case "more_6": {
                return (
                    <Box style={{ display: props?.view ? "flex" : "none" }}>
                        {props?.view && (
                            <IconButton onClick={() => props.handleIcon("info", main)}>
                                <MoreVertIcon sx={tableWithPagination_style.more} />
                            </IconButton>
                        )}
                    </Box>
                );
            }
            case "more_6_ins_item": {
                return (
                    <Box sx={{ float: "right" }}>
                        <IconButton>
                            {/* <MoreVertIcon
                                style={tableWithPagination_style.more}
                                handleIcon={props?.handleIcon}
                            /> */}
                        </IconButton>
                    </Box>
                );
            }
            case "more_7": {
                return (
                    <div
                        style={{ display: props?.view || props?.edit ? "flex" : "none" }}
                    >
                        <IconButton
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>
                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                {props?.view && (
                                    <MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClose();
                                            props.handleIcon("view", main);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        View
                                    </MenuItem>
                                )}
                                {props?.edit && (
                                    <MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClose();
                                            props.handleIcon("active", main, main.status);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        {main.status === "Active" ? "In-active" : "Active"}
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </div>
                );
            }
            case "object_status_inspection": {
                if (data?.value.value === "Yet to be Assign") {
                    return (
                        <Typography
                            sx={{
                                color: "#FF9340",
                                fontSize: "14px",
                            }}
                        >
                            {data.value.label}
                        </Typography>
                    );
                } else if (data?.value.value === "Assigned") {
                    return (
                        <Typography
                            sx={{
                                color: "#78B1FE !important",
                                fontSize: "14px",
                            }}
                        >
                            {data.value.label}
                        </Typography>
                    );
                } else if (data?.value.value === "Completed") {
                    return (
                        <Typography
                            sx={{
                                color: "#5AC782 !important",
                                fontSize: "14px",
                            }}
                        >
                            {data.value.label}
                        </Typography>
                    );
                } else {
                    return data.value;
                }
            }
            case "inputBox": {
                return (
                    <div style={{ display: props?.edit ? "flex" : "none" }}>
                        {props?.edit && (
                            <Checkbox
                                checked={val?.is_active}
                                onChange={(e) =>
                                    props.handleIcon("checkBox", data, e.target.checked)
                                }
                            />
                        )}
                    </div>
                );
            }
            case "unused_balance": {
                return (
                    <Typography
                        sx={{
                            color: data.value > 0 ? "#5AC782" : "auto",
                            fontSize: "14px",
                        }}
                    >
                        {data.value > 0 ? data.value : 0}
                    </Typography>
                );
            }
            case "more_appraisal": {
                return (
                    <div
                        style={{ display: props?.edit || props?.delete ? "flex" : "none" }}
                    >
                        <IconButton
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setAnchorEl(e.currentTarget);
                                setIndex(data.index);
                            }}
                        >
                            <MoreVertIcon sx={tableWithPagination_style.more} />
                        </IconButton>

                        {index === data?.index && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                sx={tableWithPagination_style.menuList}
                            >
                                {props?.edit &&
                                    new Date(main?.data?.effective_start_date) <= new Date() &&
                                    main?.Status !== "Active" && (
                                        <MenuItem
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClose();
                                                props.handleIcon("Activate", main);
                                            }}
                                            sx={tableWithPagination_style.menuItem}
                                        >
                                            Activate
                                        </MenuItem>
                                    )}

                                {props?.delete && (
                                    <MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClose();
                                            props.handleIcon("Delete", main);
                                        }}
                                        sx={tableWithPagination_style.menuItem}
                                    >
                                        Delete
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </div>
                );
            }
            case "inventory": {
                return (
                    <Typography
                        style={{
                            whiteSpace: "nowrap",
                        }}
                        sx={tableWithPagination_style.text}
                    >
                        {data.value ? "Yes" : "No"}
                    </Typography>
                );
            }
            case "api_key": {
                return (
                    <Box sx={tableWithPagination_style.iconText}>
                        <Box sx={tableWithPagination_style.iconLock}>
                            <LockKey />
                        </Box>
                        <Box>
                            <Typography>***************</Typography>
                        </Box>
                    </Box>
                );
            }
            case "action_copy": {
                return (
                    <Box sx={tableWithPagination_style.copyIcon}>
                        <CopyIcon />
                    </Box>
                );
            }
            case "action_edit": {
                return (
                    <Box
                        sx={tableWithPagination_style.editIcon}
                        onClick={() => props?.handleIcon("edit", main)}
                    >
                        <EditIcon />
                    </Box>
                );
            }
            case "hashtags": {
                return data?.value ? (
                    <Box sx={tableWithPagination_style.autoText}>
                        <Typography>{data?.value}</Typography>
                    </Box>
                ) : (
                    <></>
                );
            }
            case "status_alert": {
                if (data?.value === "Active") {
                    return (
                        <Typography
                            sx={{
                                color: "#11AA00",
                                fontSize: "14px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else if (data?.value === "Inactive") {
                    return (
                        <Typography
                            sx={{
                                color: "#FF3232",
                                fontSize: "14px",
                            }}
                        >
                            {data.value}
                        </Typography>
                    );
                } else {
                    return data.value;
                }
            }
            case "isActive": {
                if (data?.value) {
                    return (
                        <Typography
                            sx={{
                                color: "#11AA00 !important",
                                fontSize: "14px",
                                textTransform: "capitalize",
                            }}
                        >
                            {data.value.toString()}
                        </Typography>
                    );
                } else {
                    return (
                        <Typography
                            sx={{
                                color: "#FF3232 !important",
                                fontSize: "14px",
                                textTransform: "capitalize",
                            }}
                        >
                            {data.value.toString()}
                        </Typography>
                    );
                }
            }
            default: {
                return data.value;
            }
        }
    };


    return (
        <Box sx={tableWithPagination_style.root}>
            {props?.rows?.length === 0 ? (
                <Box
                    sx={tableWithPagination_style.noRecordDiv}
                // sx={{
                //     minHeight: props?.height && props?.height,
                //     maxHeight: props?.height && props?.height,
                // }}
                >
                    <p style={tableWithPagination_style.typo}>No Data Found</p>
                </Box>
            ) : (
                <>
                    <TableContainer
                        sx={tableWithPagination_style.tableContainer}
                    // sx={{
                    //     //zIndex: -1,
                    //     minHeight: props?.height && props?.height,
                    //     maxHeight: props?.height && props?.height,
                    //     mt: 2,
                    // }}
                    >
                        {/* <br /> */}
                        {/* Table Component */}
                        <Table
                            sx={tableWithPagination_style.totalTable}
                            stickyHeader
                            aria-label="customized table"
                        >
                            {/* heading */}
                            <TableHead sx={tableWithPagination_style.thead}>
                                {props?.heading?.length > 0 && (
                                    <TableRow>
                                        {props?.heading?.map((data: any, index: any) => {
                                            return (
                                                <div
                                                    // style={{
                                                    //     // color: theme.typography.color.secondary,
                                                    //     fontSize: "14px",
                                                    //     border: 0,
                                                    //     // backgroundColor: headingColor ?? "#F2F4F7",
                                                    //     padding: "16px",
                                                    //     zIndex: "0 !important",
                                                    // }}
                                                    // headingColor={props?.headingColor}
                                                    // size="small"
                                                    key={index}
                                                >
                                                    {data.title}
                                                </div>
                                            );
                                        })}
                                    </TableRow>
                                )}
                            </TableHead>
                            {/* rows */}
                            {props?.tableType === "normal" && <Box height={"8px"} />}
                            <TableBody sx={tableWithPagination_style.tableBodyText}>
                                {props?.rows?.length > 0 && (
                                    <>
                                        {props?.rows?.map((row: any, index: any) => {
                                            return (
                                                <>
                                                    <div
                                                        // selected={row?.selectedRow}
                                                        key={index + 1}
                                                        // style={tableWithPagination_style.tbody}
                                                        // style={{
                                                        //     backgroundColor:
                                                        //         row?.status && props?.isColor === true
                                                        //             ? "#F5F7FA"
                                                        //             : "auto",
                                                        // }}
                                                        onClick={() =>
                                                            props?.onClick && props?.onClick(row)
                                                        }
                                                    >
                                                        {props?.dataType?.map((val: any) => {
                                                            return (
                                                                <div
                                                                    // style={{
                                                                    //     "&:nth-of-type(odd)": {
                                                                    //         backgroundColor: "#FFFFFF",
                                                                    //     },

                                                                    //     // hide last border
                                                                    //     "&:last-child td, &:last-child th": {
                                                                    //         border: 0,
                                                                    //     },
                                                                    // }}
                                                                    // stickyHeader={true}
                                                                    // headingColor={props?.cellColor}
                                                                    // component={"th"}
                                                                    // scope="row"
                                                                    onClick={() => {
                                                                        if (
                                                                            val.type[0] === "more" ||
                                                                            val.type[0] === "more_2" ||
                                                                            val.type[0] === "unit" ||
                                                                            val.type[0] === "block" ||
                                                                            val.type[0] === "textLink" ||
                                                                            val.type[0] === "floor" ||
                                                                            val.type[0] === "more_3" ||
                                                                            val?.type[0] === "info" ||
                                                                            val?.type[0] === "checkBox" ||
                                                                            val.type[0] === "more_4" ||
                                                                            val?.type[0] === "inspection_status" ||
                                                                            val?.type[0] === "inputBox" ||
                                                                            val?.type[0] === "view_more" ||
                                                                            val?.type[0] === "more_appraisal" ||
                                                                            val?.type[0] === "more_5" ||
                                                                            val?.type[0] === "api_key" ||
                                                                            val?.type[0] === "action_copy" ||
                                                                            val?.type[0] === "action_edit"
                                                                        ) {
                                                                        } else {
                                                                            props?.view &&
                                                                                props.handleIcon &&
                                                                                props.handleIcon("view", row);
                                                                        }
                                                                    }}
                                                                >
                                                                    {val.type.map((type: any) => {
                                                                        return getComponentType(row, {
                                                                            index: index,
                                                                            type: type,
                                                                            main: row,
                                                                            value: row[val.name],
                                                                            image: row[val.imagekey],
                                                                            icon: row[val.icon],
                                                                            is_active: row[val.is_active],
                                                                            objectOption: val?.label ?? "label",
                                                                        });
                                                                    })}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {props.tableType === "normal" && (
                                                        <Box height={"8px"} />
                                                    )}
                                                </>
                                            );
                                        })}
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination Section */}
                    {props?.showpagination && (
                        <>
                            <Box sx={tableWithPagination_style.pagination}>
                                {/* <p sx={tableWithPagination_style.typo}>
              pages {1}/{Math.ceil(props.rows.length / pageSize)}
            </p> */}
                                {/* <div sx={tableWithPagination_style.flexRow}>
                  {props?.rows?.length > 0 && (
                    <p sx={tableWithPagination_style.typo}>{returnPageNumber()}</p>
                  )}
                  <Pagination
                    sx={tableWithPagination_style.paginate}
                    shape="rounded"
                    count={Math.ceil(totalCount / props?.limit)}
                    page={props?.page}
                    // onChange={handleChange}
                    onChange={(e, value) => props?.handlePagination(value)}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </div> */}

                                <Pagination
                                    sx={tableWithPagination_style.paginateNum}
                                    color="primary"
                                    count={10}
                                    showFirstButton
                                    showLastButton
                                />
                            </Box>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};


