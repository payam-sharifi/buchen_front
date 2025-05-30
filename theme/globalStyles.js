// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import { useTheme, alpha } from '@mui/material';
import { bgBlur } from '#/ui/component/chart/cssStyles';
import { faFont, enFont } from './font';
import { useAppSelector } from '#/redux/hooks';
import { useParams } from 'next/navigation';
// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const { lang } = useParams();
  const theme = useTheme();
  const isDarkTheme = useAppSelector((state) => state.settingSlice.darkTheme);
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
          direction: theme.direction,
          fontFamily:
            lang === 'ar' || lang === 'en'
              ? ``
              : `${faFont.style.fontFamily} !important`,
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          scrollbarColor: 'rgba(114, 0, 114, 0.54) rgba(255, 208, 255, 0.24)',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        table: {
          width: '100% !important',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          webkitUserSelect: 'text !important',
          khtmlUserSelect: 'text!important',
          mozUserSelect: 'text!important',
          msUserSelect: 'text!important',
          userSelect: 'text!important',
          '&[type=file]': {
            display: 'none',
          },
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        textarea: {
          webkitUserSelect: 'text !important',
          khtmlUserSelect: 'text!important',
          mozUserSelect: 'text!important',
          msUserSelect: 'text!important',
          userSelect: 'text!important',
          '&::-webkit-input-placeholder': {
            color: theme.palette.text.disabled,
          },
          '&::-moz-placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          '&:-ms-input-placeholder': {
            color: theme.palette.text.disabled,
          },
          '&::placeholder': {
            color: theme.palette.text.disabled,
          },
        },
        '& :-webkit-autofill': {
          transitionDelay: '999999s',
        },
        '&::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.background.paper,
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.lighter,
          borderRadius: '6px',
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        a: {
          color: theme.palette.text.primary,
          textDecoration: 'none !important',
        },
        form: {
          width: 'inherit',
        },
        '.gallery-thumbs-swiper .swiper-wrapper': {
          display: 'flex!important',
          justifyContent: 'center!important',
          padding: '10px!important',
        },
        '.apexcharts-theme-light .apexcharts-menu-item:hover ': {
          backgroundColor: theme.palette.background.default + '!important',
        },

        '.apexcharts-menu-item': {
          backgroundColor: theme.palette.background.paper,
        },
        '.apexcharts-theme-light .apexcharts-menu': {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.primary.light}`,
        },
        '.apexcharts-canvas': {
          // Tooltip
          direction: 'ltr',
          '.apexcharts-tooltip': {
            backgroundColor: theme.palette.background.default,
          },
          '.apexcharts-xaxistooltip': {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[5],
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '&:before': { borderBottomColor: 'transparent' },
            '&:after': {
              borderBottomColor: alpha(theme.palette.background.default, 0.8),
            },
          },
          '.apexcharts-tooltip.apexcharts-theme-light': {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            // background: 'red ',
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[5],
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '.apexcharts-tooltip-title': {
              border: 0,
              textAlign: 'center',
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: alpha(theme.palette.grey[500], 0.16),
              color:
                theme.palette.text[
                  isDarkTheme !== ' ' ? 'primary' : 'secondary'
                ],
            },
          },

          // Legend
          '.apexcharts-legend': {
            padding: 0,
          },
          '.apexcharts-legend-series': {
            display: 'flex !important',
            alignItems: 'center',
          },
          '.apexcharts-legend-marker': {
            marginRight: 8,
          },
          '.apexcharts-legend-text': {
            lineHeight: '18px',
            textTransform: 'capitalize',
          },
        },
      }}
    />
  );

  return inputGlobalStyles;
}
