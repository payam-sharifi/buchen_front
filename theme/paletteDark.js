import { alpha } from '@mui/material/styles';
import referenceColors from '#/theme/referenceColors.json';
// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: referenceColors['Base1'],
  100: referenceColors['Base2'],
  200: referenceColors['NeutralVariant40'],
  300: referenceColors['NeutralVariant30'],
  400: referenceColors['NeutralVariant60'],
  500: referenceColors['NeutralVariant70'],
  600: referenceColors['NeutralVariant80'],
  700: referenceColors['NeutralVariant92'],
  800: referenceColors['Base1'],
  900: referenceColors['Base1'],
};

const PRIMARY = {
  // lighter: referenceColors['Primary99'],
  lighter: referenceColors['NeutralVariant40'],
  light: referenceColors['Primary40'],
  main: referenceColors['Primary50'],
  dark: referenceColors['PrimaryVariant80'],
  darker: referenceColors['PrimaryVariant99'],
  contrastText: referenceColors['Base1'],
  backIcon: referenceColors['PrimaryBackIcon'],
  backIconPurple: referenceColors['PurpleBackIcon'],
  backBox: referenceColors['PrimaryDarkBox'],
};

const SECONDARY = {
  lighter: referenceColors['NeutralVariant50'],
  light: referenceColors['NeutralVariant60'],
  main: referenceColors['Neutral50'],
  dark: referenceColors['NeutralVariant95'],
  darker: referenceColors['NeutralVariant90'],
  contrastText: referenceColors['Base1'],
};

const INFO = {
  // lighter: referenceColors['Base1'],
  // light: referenceColors['Blue99'],
  // main: referenceColors['Blue70'],
  // dark: referenceColors['Blue92'],
  // darker: referenceColors['Blue95'],
  // contrastText: referenceColors['Base1'],
  // backIcon: referenceColors['BlueBackIcon'],
  lighter: referenceColors['Blue60'],
  light: referenceColors['Blue50'],
  main: referenceColors['Blue70'],
  dark: referenceColors['Blue92'],
  darker: referenceColors['Blue95'],
  contrastText: referenceColors['Base1'],
  backIcon: referenceColors['BlueBackIcon'],
};

const SUCCESS = {
  lighter: referenceColors['Base1'],
  light: referenceColors['GreenShade'],
  main: referenceColors['Green60'],
  dark: referenceColors['Green95'],
  darker: referenceColors['Green99'],
  contrastText: GREY[800],
  backIcon: referenceColors['GreenBackIcon'],
};

const WARNING = {
  lighter: referenceColors['Yellow30'],
  light: referenceColors['YellowTint'],
  main: referenceColors['Yellow70'],
  dark: referenceColors['YellowShade'],
  darker: referenceColors['Yellow95'],
  contrastText: GREY[800],
  backIcon: referenceColors['YellowBackIcon'],
};

const ERROR = {
  lighter: referenceColors['Red50'],
  light: referenceColors['RedShade'],
  main: referenceColors['Red70'],
  dark: referenceColors['Red95'],
  darker: referenceColors['Red99'],
  contrastText: referenceColors['Base1'],
};

const palette = {
  common: {
    black: referenceColors['Base2'],
    white: referenceColors['Base1'],
  },
  badge: {
    state1: referenceColors['badgeDarkState1'],
    state2: referenceColors['badgeDarkState2'],
    state3: referenceColors['badgeDarkState3'],
    state4: referenceColors['badgeDarkState4'],
    state5: referenceColors['badgeDarkState5'],
    state6: referenceColors['badgeDarkState6'],
    state7: referenceColors['badgeDarkState7'],
    onBadgeWarning: referenceColors['Yellow70'],
  },
  progress: {
    green: referenceColors['progressDarkGreen'],
    blue: referenceColors['progressDarkBLue'],
    purple: referenceColors['progressDarkPurple'],
    lightGreen: referenceColors['progressLighterDarkGreen'],
    lightBlue: referenceColors['progressLighterDarkBLue'],
    lightPurple: referenceColors['progressLighterDarkPurple'],
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
    primary: GREY[0],
    secondary: GREY[600],
    disabled: GREY[500],
    onBadge: referenceColors['onBadgeDark'],
    badgeBorder6: referenceColors['badgeDarkBorderState6'],
  },
  background: {
    paper: referenceColors['NeutralVariant20'],
    default: referenceColors['NeutralVariant30'],

    neutral: GREY[300],
    light: GREY[300],
    lightGray: GREY[200],
    mainLighter: referenceColors['badgeState3'],
  },
  border: {
    light: GREY[300],
    neutral: GREY[200],
    badgeBorder6: referenceColors['badgeDarkBorderState6'],
    badgeBorder7: referenceColors['badgeDarkBorderState6'],
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
