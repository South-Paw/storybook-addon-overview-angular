import { storiesOf, moduleMetadata } from '@storybook/angular';

import { SpinnerModule } from './index';
import changelog from './changelog.md';

storiesOf('Example|Spinner', module)
  .addDecorator(moduleMetadata({ imports: [SpinnerModule] }))
  .add(
    'Overview',
    () => ({
      template: `<my-spinner></my-spinner>`,
      props: {},
    }),
    {
      overview: {
        enabled: true,
        // required
        title: 'Spinner',
        filename: 'spinner/spinner.component',
        exportClass: 'SpinnerComponent',
        // optional, used if provided
        changelog,
        // showShortDescription: false,
        // showTags: false,
        // showLongDescription: false,
        // showUsage: false,
        // showInputs: false,
        // showOutputs: false,
        // showExports: false,
      },
    },
  );
  // .add('Playground', () => ({ template: `<my-spinner></my-spinner>` }));
