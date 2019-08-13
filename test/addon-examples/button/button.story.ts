import { storiesOf, moduleMetadata } from '@storybook/angular';

import { OverviewConfig } from '../../../src/types';

import { ButtonModule } from './index';
import changelog from './changelog.md';

const stories = storiesOf('Example|Component', module);

stories.addDecorator(moduleMetadata({ imports: [ButtonModule] }));

const overview: OverviewConfig = {
  // enable the overview for this story
  enabled: true,

  // required
  title: 'Button',
  filename: 'button.component',
  exportClass: 'ButtonComponent',

  // optional
  changelog,

  // features
  // showTitle: false,
  // showShortDescription: false,
  // showTags: false,
  // showChangelog: false,
  // showLongDescription: false,
  // showUsage: false,
  // showUsageSource: true,
  // showInputs: false,
  // showOutputs: false,
  showMethods: true,
  showAccessors: true,
  showInternalProps: true,

  // turn on debug for this story
  isDebug: true,
};

stories.add(
  'Overview',
  () => ({
    template: `<my-button [label]="label"></my-button>`,
    props: {
      label: 'Hello world 🌎',
    },
  }),
  { overview },
);
