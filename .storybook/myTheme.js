import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#30C6F3',
  colorSecondary: '#F14052',

  // UI
  appBg: 'white',
  appContentBg: '#fafafa',
  appBorderColor: '#cccccc',
  appBorderRadius: 4,

  // Typography
  fontBase: 'Roboto, serif',
  fontCode: '"Roboto Mono", Courrier, mono',

  // Text colors
  textColor: '#F14052',
  textInverseColor: '#white',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: '#30C6F3',
  barBg: '#F14052',

  // Form colors
  inputBg: 'white',
  inputBorder: '#F14052',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'My custom storybook',
});