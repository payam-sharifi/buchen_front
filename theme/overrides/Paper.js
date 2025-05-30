// ----------------------------------------------------------------------

export default function Paper() {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          // maxHeight: '300px !important',
          backgroundImage: 'none',
        },
      },
    },
  };
}
