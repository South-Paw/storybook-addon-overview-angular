import { addDecorator, configure, moduleMetadata } from '@storybook/angular';

import { withOverview, OverviewModule } from '../src';

import typedoc from '../typedoc.json';

addDecorator(withOverview(typedoc));
addDecorator(moduleMetadata({ imports: [OverviewModule] }));

const req = require.context('../test', true, /\.story\.ts$/);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
