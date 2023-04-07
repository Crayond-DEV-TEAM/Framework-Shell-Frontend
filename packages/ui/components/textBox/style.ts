export const textBoxstyle = {
  Label: {
    color: '#262C33',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '12px',
    sm: {
      fontSize: '13px ',
    },
  },

  text: {
    '& input': {
      padding: '11px 16px !important',
    },
  },

  required: {
    color: 'red',
    fontSize: (props: any) => props?.labelSize ?? '14px',
    marginBottom: (props: any) => props?.labelMarginBottom ?? '5px',
  },

  textbox: {
    backgroundColor: (props: any) => props?.color ?? 'auto',
    borderRadius: '8px',
    border: 'none',
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
      backgroundColor: '#fff',
    },
    [`& fieldset`]: {
      borderRadius: '8px',
      height: (props: any) => (props.multiline ? 'unset' : props?.height ?? 50),
      border: (props: any) => props?.border ?? '1px solid #CED3DD',
      '&:hover': {
        border: '1px solid red',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: (props: any) => props?.padding ?? '11px 14px',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#5078E1',
      },
    },
    "& svg": {
      cursor: "pointer"
    }
  },
};
