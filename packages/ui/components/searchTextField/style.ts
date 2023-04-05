export const searchTextField_Style = { 
    root: {
        flexGrow: 1,
      },
      search: {
        position: "relative",
        border: "1px solid transparent",
        // borderRadius: theme.palette.borderRadius,
        marginLeft: 0,
        width: "100%",
        display: "inline-flex",
        backgroundColor: "#FFFFFF",
      },
      searchIcon: {
        // padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      inputRoot: {
        height: "40px",
        color: "#C5C5C5",
        width: "100%",
      },
      inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        // transition: theme.transitions.create("width"),
        width: "100%",
        sm: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
      textfield: {
        "& .MuiOutlinedInput-root": {
        //   borderRadius: theme.palette.borderRadius,
    
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      },
      Label: {
        // color: theme.palette.tertiary.light,
        fontFamily: "tenant_semibold",
        fontSize: "14px",
        marginBottom: "5px",
      },
}