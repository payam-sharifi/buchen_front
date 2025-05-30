import { alpha } from '@mui/material/styles';
import referenceColors from '#/theme/referenceColors.json';
// ----------------------------------------------------------------------
// SETUP COLORS
const GREY = {
  0: referenceColors['Base2'],
  100: referenceColors['Base1'],
  200: referenceColors['Neutral95'],
  300: referenceColors['Neutral99'],
  400: referenceColors['Neutral90'],
  500: referenceColors['Neutral92'],
  600: referenceColors['Neutral70'],
  700: referenceColors['Neutral60'],
  800: referenceColors['Neutral30'],
  900: referenceColors['Neutral20'],
};

const PRIMARY = {
  lighter: referenceColors['Primary99'],
  light: referenceColors['Primary60'],
  main: referenceColors['Primary50'],
  dark: referenceColors['Primary40'],
  darker: referenceColors['Primary20'],
  contrastText: referenceColors['Base1'],
  backIcon: referenceColors['PrimaryBackIcon'],
  backIconPurple: referenceColors['PurpleBackIcon'],
  backBox: referenceColors['PrimaryBox'],
};

const SECONDARY = {
  lighter: referenceColors['Neutral92'],
  light: referenceColors['Neutral90'],
  main: referenceColors['Neutral50'],
  dark: referenceColors['Neutral92'],
  darker: referenceColors['Neutral60'],
  contrastText: referenceColors['Base1'],
};

const INFO = {
  lighter: referenceColors['Blue99'],
  light: referenceColors['Blue95'],
  main: referenceColors['Blue70'],
  dark: referenceColors['Blue60'],
  darker: referenceColors['Blue50'],
  contrastText: referenceColors['Base1'],
  backIcon: referenceColors['BlueBackIcon'],
};

const SUCCESS = {
  lighter: referenceColors['Green99'],
  light: referenceColors['GreenTint'],
  main: referenceColors['Green60'],
  dark: referenceColors['Green50'],
  darker: referenceColors['Green40'],
  contrastText: GREY[800],
  backIcon: referenceColors['GreenBackIcon'],
};

const WARNING = {
  lighter: referenceColors['Yellow99'],
  light: referenceColors['YellowShade'],
  main: referenceColors['Yellow70'],
  dark: referenceColors['Yellow40'],
  darker: referenceColors['Yellow30'],
  contrastText: GREY[800],
  backIcon: referenceColors['YellowBackIcon'],
};

const ERROR = {
  lighter: referenceColors['Red99'],
  light: referenceColors['RedTint'],
  main: referenceColors['Red70'],
  dark: referenceColors['Red60'],
  darker: referenceColors['Red50'],
  contrastText: referenceColors['Base1'],
  redShade: referenceColors['RedShade'],
};

const palette = {
  common: { black: referenceColors['Base2'], white: referenceColors['Base1'] },
  

  badge: {
    state1: referenceColors['badgeState1'],
    state2: referenceColors['badgeState2'],
    state3: referenceColors['badgeState3'],
    state4: referenceColors['badgeState4'],
    state5: referenceColors['badgeState5'],
    state6: referenceColors['badgeState6'],
    state7: referenceColors['badgeState7'],
    onBadgeWarning: referenceColors['Yellow40'],
  },
  progress: {
    green: referenceColors['progressGreen'],
    blue: referenceColors['progresBlue'],
    purple: referenceColors['progressPurple'],
    lightGreen: referenceColors['progressLightGreen'],
    lightBlue: referenceColors['progressLightBlue'],
    lightPurple: referenceColors['progressLightPurple'],
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
    onBadge: referenceColors['onBadge'],
  },
  background: {
    paper: referenceColors['Base1'],
    default: GREY[300],
    neutral: GREY[300],
    light: GREY[300],
    lightGray: GREY[200],
    mainLighter: referenceColors['badgeState3'],
  },
  border: {
    light: GREY[300],
    neutral: GREY[200],
    badgeBorder6: referenceColors['badgeBorderState6'],
    badgeBorder7: referenceColors['badgeBorderState7'],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
