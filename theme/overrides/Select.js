// ----------------------------------------------------------------------

export default function Select(theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[0],
        },
      },
    },
  };
}
