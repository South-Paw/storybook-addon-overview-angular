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

const storyWithError = (story, errorMessage, errorObject) => {
  console.warn(`[Addon Overview Angular] ${errorMessage}`, errorObject);

  return {
    ...story,
    template: `<storybook-addon-overview-error [error]="___addonOverviewError"></storybook-addon-overview-error>${story.template}`,
    props: { ___addonOverviewError: { message: errorMessage, object: errorObject }, ...story.props },
  };
}

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

export const withOverview = (typedoc, args) => (storyFn, params) => {
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
  if (!typedoc) {
    return storyWithError(story, `Decorator is enabled for the story '${params.kind} => ${params.name}', but no 'typedoc' parameter was provided.`);
  }

  const {
    isDebug = false,

    // Features of the overview component
    showTitle = true,
    showShortDescription = true,
    showTags = true,
    showChangelog = true,
    showLongDescription = true,
    showUsage = true,
    showUsageSource = false,
    showInputs = true,
    showOutputs = true,

    // Per story options
    title = null,
    filename = null,
    exportClass = null,
    changelog = null,
  } = addonConfig;

  // Properties that'll be passed to the OverviewComponent for rendering
  const overviewProps = {
    isDebug,
    features: {
      showTitle,
      showShortDescription,
      showTags,
      showChangelog,
      showLongDescription,
      showUsage,
      showUsageSource,
      showInputs,
      showOutputs,
    },
    title,
    shortDescription: null,
    tags: [],
    changelog,
    longDescription: null,
    source: story.template,
    inputs: [],
    outputs: [],
    exports: [],
  };

  // Documentation for the exported module
  const moduleDoc = typedoc.children.filter(child => child.name === `"${filename}"`)[0];

  if (!moduleDoc) {
    return storyWithError(
      story,
      `filename '${filename}' was not found in typedoc.\n\nHere's a list of filenames in the typedoc:`,
      { filenames: typedoc.children.map(child => child.name.replace(/"/g, '')) },
    );
  }

  // Documentation for the actual component
  const componentDoc = moduleDoc.children.filter(child => child.name === exportClass)[0];

  if (!componentDoc) {
    return storyWithError(
      story,
      `No documentation for exportClass '${exportClass}'\n\nHere's a list of exported classes in the typedoc for '${filename}':`,
      { exportClasses: moduleDoc.children.map(child => child.name) },
    );
  }

  if (componentDoc.comment) {
    overviewProps.shortDescription = componentDoc.comment.shortText;
    overviewProps.tags = getTags(componentDoc.comment.tags);
    overviewProps.longDescription = componentDoc.comment.text;
  }

  overviewProps.inputs = getInputs(componentDoc.children);
  overviewProps.outputs = getOutputs(componentDoc.children);
  overviewProps.exports = getExports(typedoc);

  const ___theme = args 
    ? args.theme 
      ? args.theme 
      : undefined 
    : undefined
  return {
    ...story,
    template: `<storybook-addon-overview [theme]="___theme" [config]="___addonOverview">${story.template}</storybook-addon-overview>`,
    props: { ___addonOverview: overviewProps, ___theme: ___theme, ...story.props },
  };
}

export { OverviewModule };
