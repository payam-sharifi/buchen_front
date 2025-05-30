// ----------------------------------------------------------------------

export default function Drawer(theme) {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[0],
          border: '0px',
        },
      },
    },
  };
}
