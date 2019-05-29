import { addDecorator, addParameters, configure, moduleMetadata } from '@storybook/angular';

import myTheme from './myTheme'

import { withOverview, OverviewModule } from '../src';

import typedoc from '../typedoc.json';

addParameters({
  options: {
    theme: myTheme,
  },
});

addDecorator(withOverview(typedoc, { theme: myTheme }));
addDecorator(moduleMetadata({ imports: [OverviewModule] }));

const req = require.context('../test', true, /\.story\.ts$/);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
