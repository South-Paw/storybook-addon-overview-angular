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

## Todo

- [ ] Useful errors in story area when something goes wrong
- [ ] Few more examples and test cases
- [ ] Build storybook with netlify and publish
- [ ] Document installation, setup and usage of the component + it's dependencies
- [ ] Publish an `alpha` to npm and check that it can be installed into an Angular CLI app
