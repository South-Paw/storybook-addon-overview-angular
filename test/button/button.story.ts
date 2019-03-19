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
        enabled: true,
        // required
        title: 'Button',
        filename: 'button/button.component',
        exportClass: 'ButtonComponent',
        // optional, used if provided
        changelog,
        // showShortDescription: false,
        // showTags: false,
        // showLongDescription: false,
        // showUsage: false,
        // showInputs: false,
        // showOutputs: false,
      },
    },
  );
  // .add('Playground', () => ({ template: `<my-button [label]="'epic button test0r 👌'"></my-button>` }));
