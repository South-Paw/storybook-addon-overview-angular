# storybook-addon-overview-angular

📖 An addon for Storybook to document your Angular components with.

[![Live Demo](https://img.shields.io/badge/netlify-live_demo-1e9498.svg)](https://storybook-addon-overview-angular.netlify.com/)
[![npm](https://img.shields.io/npm/v/@south-paw/storybook-addon-overview-angular.svg)](https://www.npmjs.com/package/@south-paw/storybook-addon-overview-angular)
[![Dependencies](https://david-dm.org/South-Paw/storybook-addon-overview-angular.svg)](https://david-dm.org/South-Paw/storybook-addon-overview-angular)
[![Dev Dependencies](https://david-dm.org/South-Paw/storybook-addon-overview-angular/dev-status.svg)](https://david-dm.org/South-Paw/storybook-addon-overview-angular?type=dev)

---

## About

Angular component documentation tool (similar to [addon-info](https://github.com/storybooks/storybook/tree/next/addons/info) which is React only).

This component is heavily based off and inspired by the [Atlaskit's component documentation](https://atlaskit.atlassian.com/packages/core/button) style.

Feel free to ask me questions or make suggestions if there's something missing from the documentation or something isn't clear by [raising an issue](https://github.com/South-Paw/storybook-addon-overview-angular/issues) or contacting me in the [Storybook Discord server](https://discord.gg/UUt2PJb) (`@South Paw#7636`) and I'll try help if I can.

## Features

* Configurable so you can show or hide what you want in your doc.
* Component readme generated from your component's comments.
* Versioned component changelog support.
* Live component example that can be extended with [addon-knobs](https://github.com/storybooks/storybook/tree/next/addons/knobs).
* Component properties (`@Input` and `@Output` documentation).
* Support for required and deprecated properties and per-prop documentation.
* All of the above, generated from your code with a simple story required to glue it together.

See the [live demo](https://storybook-addon-overview-angular.netlify.com/) for some examples of documented components and check the options out down below 👇

## Getting Started

1. Install [TypeDoc](https://typedoc.org/) as a dev dependency
    * `yarn add typedoc -D`
    * or `npm i typedoc -D`
2. Add a `script` to generate your components TypeDoc to your `package.json`
    * e.g. `scripts: { "typedoc": "typedoc --json typedoc.json --exclude **/*.story.* ./test" }`
      * `--json typedoc.json` is the json output file location and name
      * `--exclude **/*.story.*` means it won't attempt to generate typedocs for storybook stories
      * You may also want to skip test files or other files by adding another `--exclude **/*.test.*` after the first exclude
      * `./test` is the folder which typedoc is going to generate for, I really suggest keeping the scope small rather than 'everything' in your app folder as this seems to affect load times of the Storybook. I usually have scoped it to a `/components` folder which holds all my reusable Angular components
      * Refer to the [TypeDoc arguments](https://typedoc.org/guides/arguments/) for more information
3. Check that the TypeDoc script runs okay with `yarn typedoc` or `npm run typedoc`
    * A file called `typedoc.json` should appear where your `--json` file was set to output
4. You then need to chain the typedoc generation to occur before you storybook starts or builds
    * e.g. `scripts: { "storybook": "yarn typedoc && start-storybook" }`
    * The TypeDoc does not auto reload/generate when a component changes, so at the moment you need to restart your storybook task to update the properties.
5. Install this package as a dev dependency
    * `yarn add @south-paw/storybook-addon-overview-angular -D`
    * or `npm i @south-paw/storybook-addon-overview-angular -D`
6. Add the `withOverview` addon to your `.storybook` config:

```js
// .storybook/config.js
import { addDecorator, configure, moduleMetadata } from '@storybook/angular';
import { withOverview, OverviewModule } from '@south-paw/storybook-addon-overview-angular';

// import your generated typedoc file
import typedoc from '../typedoc.json';

// init the withOverview addon with your generated typedoc file
addDecorator(withOverview(typedoc));

// add the required overview components
addDecorator(moduleMetadata({ imports: [OverviewModule] }));

// ...and then your story loading code...
const req = require.context('../test', true, /\.story\.ts$/);
const loadStories = () => req.keys().forEach(filename => req(filename));
configure(loadStories, module);
```

The addon is `disabled` for all stories and must be enabled on a per story basis (unless you enable it globally with `addParameters` in the config file)

To enable the overview on a story you would do the following in a story:

```js
storiesOf('Components|Button', module)
  .add(
    'Overview',
    () => ({
      // the templated component becomes the example and it's source will be shown too
      template: `<my-button [label]="label"></my-button>`,
    }),
    {
      overview: {
        enabled: true,
        title: 'Button',
        filename: 'button/button.component',
        exportClass: 'ButtonComponent',
        // ... other overview options
      },
    },
  );
```

## Overview Options

Options are simply given to the story as parameters in the `overview` key (as above)

#### `enabled`: boolean = false

Required to enable the overview components on the story.

#### `title`: string = null

The title of this overview story

#### `filename`: string _required_

The name of the component's file as exported by typedoc.

If you get this wrong, the overview component will render an error which you can use to help you find the right name. The error will list all valid `filename`s it has from the TypeDoc.

#### `exportClass`: string _required_

The exported class name of the component.

If you get this wrong, the overview component will render an error which you can use to help you find the right class name. The error will list all valid `exportClass`s it has from the TypeDoc.

#### `changelog`: string = null

Changelog you wish to render in the overview component.

If no `changelog` is provided, it won't be rendered.

To load a changelog, simply import the `.md` file to the story.

Changelog uses `h3` headers (###) to deliminate between versions, it will always show the top most version in the `.md` file and expects the header to be followed by a list. [Here is an example changelog file](/test/button/changelog.md).

Example of use in story:

```js
import changelog from './changelog.md';

...

storiesOf('Components|Button', module)
  .add('Overview', () => ({ template: `<my-button [label]="label"></my-button>` }), {
    overview: {
      enabled: true,
      title: 'Button',
      filename: 'button/button.component',
      exportClass: 'ButtonComponent',
      changelog,
    },
  });
```

#### `showTitle`: boolean = true

Whether to show the title in the overview component.

#### `showShortDescription`: boolean = true

Whether to show the short description in the overview component.

This is generated from the first line of the component's documentation block.

#### `showTags`: boolean = true

Whether to show the tags in the overview component.

These are generated from the components documentation block and support markdown.

```js
/**
 * Short description about the component.
 *
 * Long description about the component...
 *
 * @version 0.0.1
 * @string Example String
 * @link [Design Spec](http://example.com)
 * @key_with_spaces [Another Example](http://example.com)
 */
@Component({
  ...
})
export class MyCoolComponent { ... }
```

* `@version` will become `Version` and `0.0.1` will be it's value
* `@string` will become `String` and `Example String` will be it's value
* `@link` will become `Link` and `[Design Spec](http://example.com)` will become an a tag with an href of `http://example.com` and value of `Design Spec`
* `@key_with_spaces` will become `Key With Spaces` and `[Another Example](http://example.com)` will become an a tag with an href of `http://example.com` and value of `Another Example`

#### `showChangelog`: boolean = true

Whether to show the changelog in the overview component.

If no `changelog` is provided, it won't be rendered anyway.

#### `showLongDescription`: boolean = true

Whether to show the long description in the overview component.

This is generated from the everything after the first line of the component's documentation block.

Note: the long description also supports markdown from the component's documentation block.

#### `showUsage`: boolean = true

Whether to show the example usage of the component you're documenting.

#### `showUsageSource`: boolean = false

If the usage example's source code is open or closed when the story is viewed.

#### `showInputs`: boolean = true

Whether to render the `@Input()` members of the component.

#### `showOutputs`: boolean = true

Whether to render the `@Output()` members of the component.

#### `showMethods`: boolean = false

Whether to render the public methods of the component's class.

#### `showAccessors`: boolean = false

Whether to render the public `get/set` accessors of the component's class.

#### `showInternalProps`: boolean = false

Whether to render the public properties/members of the component's class.

#### `isDebug`: boolean = false

Turn on debugging mode of the overview component.

Helpful to inspect the generated TypeDoc for your inputs and outputs.

## Project Development

Install [`Node.js`](https://nodejs.org/) and [`Yarn`](https://yarnpkg.com)

Open command line in the project folder and then use any of the following commands

```bash
# install dependencies
yarn

# run storybook in dev (localhost:9000)
yarn storybook

# build storybook
yarn storybook:build

# generate typedoc.json file (is also run on `yarn storybook` script)
yarn typedoc
```

* `src/` contains all the addon's code and rendering components.
* `test/` contains sample storybook and components for the generated live site.
