// ----------------------------------------------------------------------

export default function Alert(theme) {
  return {
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        message: {
          padding: theme.spacing(0, 2),
        },
        action: {
          padding: theme.spacing(0),
        },
      },
    },
  };
}
