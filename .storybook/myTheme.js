import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#00BAFE',
  colorSecondary: '#F14052',

  // // UI
  appBg: '#fafafa',
  appContentBg: '#fafafa',
  appBorderColor: '#cccccc',
  // appBorderRadius: 4,

  // // Typography
  fontBase: 'Roboto, serif',
  fontCode: '"Roboto Mono", Courier, mono',

  // // Text colors
  textColor: '#F14052',
  textInverseColor: 'white',

  // // Toolbar default and active colors 
  barTextColor: 'white',
  barSelectedColor: '#00BAFE',
  barBg: '#F14052',

  // // Form colors
  // inputBg: 'white',
  // inputBorder: '#F14052',
  // inputTextColor: 'black',
  // inputBorderRadius: 4,

  brandTitle: 'My Themed Storybook',

  propRequiredColor: '#FF0000',
  propNameColor: '#A101F9',
  propTypeColor: '#2879F4',
  propDefaultValueColor: 'orange',
  // propReferenceColor: '#00DCD6',
  propStringColor: '#00D545',
  // propNumberColor: '#00BAFE',
  // propBooleanColor: '#00DCD6',
  // propArrayColor: '#FF00C1'
});