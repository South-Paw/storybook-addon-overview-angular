import 'marked/lib/marked.js';

import { OverviewModule } from './components/components.module';

const defaultConfig = {
  enabled: false,
  typedoc: null,
};

// Reference: https://typedoc.org/api/enums/reflectionkind.html
const IGNORED_TYPE_KINDS = [
  128 // Class
];

const getTags = tags => tags.map(tag => {
  const formattedTag = tag.tag.split('_').join(' ');

  if (tag.text.includes('<')) {
    const split = tag.text.split('<').map(str => str.replace(/>/g, '').trim());

    return {
      tag: formattedTag,
      label: split[0],
      href: split[1],
    };
  }

  return {
    tag: formattedTag,
    label: tag.text,
  };
});

const getInputs = componentDocChildren => {
  if (!componentDocChildren) {
    return [];
  }

  return componentDocChildren.filter(child => {
    if (child.decorators) {
      return child.decorators.filter(decorator => decorator.name === 'Input').length;
    }

    return false;
  });
};

const getOutputs = componentDocChildren => {
  if (!componentDocChildren) {
    return [];
  }

  return componentDocChildren.filter(child => {
    if (child.decorators) {
      return child.decorators.filter(decorator => decorator.name === 'Output').length;
    }

    return false;
  });
};

const getExports = typedoc => {
  const exported = [];

  typedoc.children
    .filter(child => child.children)
    .forEach(child =>
      child.children.forEach(exportObj => {
        if (!IGNORED_TYPE_KINDS.includes(exportObj.kind)) {
          exported.push(exportObj);
        }
      }),
    );

  return exported;
};

export const withOverview = (storyFn, params) => {
  const story = storyFn();

  const addonConfig = {
    ...defaultConfig,
    ...params.parameters.overview,
  };

  // Don't do anything if the addon isn't enabled
  if (!addonConfig.enabled) {
    return story;
  }

  // Warn if no typedoc was provided
  if (!addonConfig.typedoc) {
    console.warn(`[Addon Overview Angular] Decorator is enabled for the story '${params.kind} => ${params.name}', but no 'typedoc' parameter was provided.`);
    return story; // TODO: render error
  }

  // All configurable options
  const features = {
    showShortDescription: addonConfig.showShortDescription,
    showTags: addonConfig.showTags,
    showChangelog: addonConfig.showChangelog,
    showLongDescription: addonConfig.showLongDescription,
    showUsage: addonConfig.showUsage,
    showInputs: addonConfig.showInputs,
    showOutputs: addonConfig.showOutputs,
  };

  // Create the final config; mainly turns 'undefined' into 'false'
  const featuresConfig = {};
  Object.keys(features).forEach(key => {
    featuresConfig[key] = !(features[key] != null);
  })

  // Props for the `storybook-addon-overview` component
  const overviewProps = {
    features: featuresConfig,
    title: addonConfig.title,
    shortDescription: null,
    tags: [],
    changelog: addonConfig.changelog,
    longDescription: null,
    source: story.template,
    inputs: [],
    outputs: [],
    exports: [],
  };

  // Documentation for the exported module
  const moduleDoc = addonConfig.typedoc.children.filter(child => child.name === `"${addonConfig.filename}"`)[0];

  if (!moduleDoc) {
    console.warn(
      `[Addon Overview Angular] filename '${addonConfig.filename}' was not found in typedoc.\n\nHere's a list of filenames in the typedoc:`,
      addonConfig.typedoc.children.map(child => child.name.replace(/"/g, '')),
    );
    return story; // TODO: render error
  }

  // Documentation for the actual component
  const componentDoc = moduleDoc.children.filter(child => child.name === addonConfig.exportClass)[0];

  if (!componentDoc) {
    console.warn(
      `[Addon Overview Angular] No documentation for exportClass '${addonConfig.exportClass}'\n\nHere's a list of exported classes in the typedoc for '${addonConfig.filename}':`,
      moduleDoc.children.map(child => child.name),
    );
    return story; // TODO: render error
  }

  if (componentDoc.comment) {
    overviewProps.shortDescription = componentDoc.comment.shortText;
    overviewProps.tags = getTags(componentDoc.comment.tags);
    overviewProps.longDescription = componentDoc.comment.text;
  }

  overviewProps.inputs = getInputs(componentDoc.children);
  overviewProps.outputs = getOutputs(componentDoc.children);
  overviewProps.exports = getExports(addonConfig.typedoc);

  return {
    ...story,
    template: `<storybook-addon-overview [config]="___addonOverview">${story.template}</storybook-addon-overview>`,
    props: { ___addonOverview: overviewProps, ...story.props },
  };
}

export { OverviewModule };
