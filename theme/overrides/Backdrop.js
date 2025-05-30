import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop() {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#000', 0.15),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
