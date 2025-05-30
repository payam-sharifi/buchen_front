import localFont from 'next/font/local';

export const faFont = localFont({
  variable: '--my-custom-font',
  src: [
    {
      path: './fonts/IranSansX(Pro)/Farsi numerals/Webfonts/Woff/IRANSansXFaNum-Regular.woff',
      weight: 'normal',
      style: 'normal',
    },
  ],
});

export const enFont = localFont({
  variable: '--my-custom-font',
  src: [
    {
      path: './fonts/IranSansX(Pro)/NonEnglish/Webfont NonEn/woff/IRANSansXNoEn-Regular.woff',
      weight: 'normal',
      style: 'normal',
    },
  ],
});

export const faaFont = localFont({
  // Define a css variable to use down the line --> e.g. font-family: var(--my-custom-font)
  variable: '--my-custom-font',
  // Define variants for your font.
  // weight = "font-weight". will use the matching variant when you
  // set font-weight CSS prop on your text elements
  src: [
    // {
    //   path: "path/to/public/fonts/MyCustomFont-Book_Web.woff2",
    //   weight: "350",
    //   style: "normal",
    // },
    {
      path: './fonts/woff/iranyekanwebregularfanum.woff',
      weight: 'normal',
      style: 'normal',
    },
    // {
    //   path: "./fonts/woff/IRANYekanWebBlack.woff",
    //   weight: "500",
    //   style: "normal",
    // },
    // {
    //     path: "./fonts/ttf/IRANYekanWebMedium.ttf",
    //     weight: "500",
    //     style: "normal",
    //   },

    // {
    //   path: "path/to/public/fonts/fonts/MyCustomFont-Bold_Web.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
  ],
  // Or, you can define a single font instead e.g.
  // src: "path/to/public/fonts/MyCustomFont-Book_Web.woff2"
});
