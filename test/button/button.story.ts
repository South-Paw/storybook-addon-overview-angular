import { storiesOf, moduleMetadata } from '@storybook/angular';

import { ButtonModule } from './index';
import changelog from './changelog.md';

storiesOf('Example|Button', module)
  .addDecorator(moduleMetadata({ imports: [ButtonModule] }))
  .add(
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
  // .add('Playground', () => ({ template: `<my-button [label]="'epic button test0r 👌'"></my-button>` }));
