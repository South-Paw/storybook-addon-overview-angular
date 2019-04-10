# storybook-addon-overview-angular

📖 An addon for Storybook to document your Angular components with.

[![Live Demo](https://img.shields.io/badge/netlify-live_demo-1e9498.svg)](https://storybook-addon-overview-angular.netlify.com/)
[![npm](https://img.shields.io/npm/v/@south-paw/storybook-addon-overview-angular.svg)](https://www.npmjs.com/package/@south-paw/storybook-addon-overview-angular)
[![Dependencies](https://david-dm.org/South-Paw/storybook-addon-overview-angular.svg)](https://david-dm.org/South-Paw/storybook-addon-overview-angular)
[![Dev Dependencies](https://david-dm.org/South-Paw/storybook-addon-overview-angular/dev-status.svg)](https://david-dm.org/South-Paw/storybook-addon-overview-angular?type=dev)

---

## About

This is still a WIP, but you should be able to pull it down, `yarn` to install and then `yarn storybook` to see what the output is like.

It's very much based off [Atlaskit's component documentation](https://atlaskit.atlassian.com/packages/core/button).

`/src` contains the storybook decorator and angular components for rendering.

`/test` contains some sample components that are documented using the decorator.

For now, check the `/.storybook/config.js` for how the decorator is hooked into the storybook.

You also have to have generated a [Type Doc](https://typedoc.org/) for your Angular components and pass this via a param (again, see storybook config or the `package.json` for how it's being done within this project).

## Development

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
