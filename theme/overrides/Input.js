import { alpha } from '@mui/material/styles';
// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          // "&:has(> input:-webkit-autofill)": {
          //   backgroundColor: "blue",
          // },
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[500], 0.12),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.dark,
          '&.Mui-focused': {
            color: theme.palette.primary.darker,
          },
          ...(theme.direction !== 'ltr' && {
            transformOrigin: 'top right',
            left: 'auto',
            right: '30px',
          }),
          '&.Mui-disabled': {
            color: '#000',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.palette.primary.dark,
          '&.Mui-focused': {
            borderColor: theme.palette.primary.darker,
          },
        },
        ...(theme.direction !== 'ltr' && {
          notchedOutline: {
            textAlign: 'right',
            borderColor: theme.palette.primary.dark,
            '&.Mui-focused': {
              borderColor: theme.palette.primary.darker,
            },
          },
          paddingRight: '0px',
          input: {
            // padding: '13px 14px',
            '&.Mui-disabled': {
              borderRadius: '10px',
              backgroundColor: theme.palette.grey[500_12],
            },
          },
        }),

        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[200],
          },
          '&.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.dark,
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.MuiSelect-icon': {
            ...(theme.direction !== 'ltr' && {
              right: 'auto',
              left: '9px',
            }),
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: theme.palette.error.dark,
          padding: theme.spacing(1, 0),
          margin: 0,
          ...(theme.direction === 'rtl' && {
            textAlign: 'right',
          }),
        },
      },
    },
  };
}
