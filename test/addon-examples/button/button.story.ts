import { storiesOf, moduleMetadata } from '@storybook/angular';

import { ButtonModule } from './index';
import changelog from './changelog.md';

const stories = storiesOf('Component Examples|Button', module);

stories.addDecorator(moduleMetadata({ imports: [ButtonModule] }));

stories.add(
  'Overview',
  () => ({
    template: `<my-button [label]="label"></my-button>`,
    props: {
      label: 'Hello world 🌎',
    },
  }),
  {
    overview: {
      // enable the overview for this story
      enabled: true,

      // required
      title: 'Button',
      filename: 'button/button.component',
      exportClass: 'ButtonComponent',

      // optional
      changelog,

      // options
      // showTitle: false,
      // showShortDescription: false,
      // showTags: false,
      // showChangelog: false,
      // showLongDescription: false,
      // showUsage: false,
      // showUsageSource: true,
      // showInputs: false,
      // showOutputs: false,

      // turn on debug for this story
      isDebug: true,
    },
  },
);
