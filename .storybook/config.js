import { addDecorator, addParameters, configure, moduleMetadata } from '@storybook/angular';

import { withOverview, OverviewModule } from '../src';
import typedoc from '../typedoc.json';

addDecorator(withOverview);
addDecorator(moduleMetadata({ imports: [OverviewModule] }));
addParameters({ overview: { typedoc } });

const req = require.context('../test', true, /\.story\.ts$/);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
