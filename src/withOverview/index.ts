import { OverviewConfig, OverviewProps } from '../types';
import { storyWithError, storyWithOverview } from './storyWith';
import {
  getAccessors,
  getExports,
  getInputs,
  getInternalProps,
  getLongDescription,
  getMethods,
  getOutputs,
  getShortDescription,
  getTags,
} from './utils';

const defaultConfig: OverviewConfig = {
  enabled: false,
  isDebug: false,

  // Features
  showTitle: true,
  showShortDescription: true,
  showTags: true,
  showChangelog: true,
  showLongDescription: true,
  showUsage: true,
  showUsageSource: false,
  showInputs: true,
  showOutputs: true,
  showMethods: false,
  showAccessors: false,
  showInternalProps: false,

  // Per story
  title: null,
  filename: null,
  exportClass: null,
  changelog: null,
};

const withOverview = typedoc => (storyFn, params) => {
  const story = storyFn();
  const config: OverviewConfig = { ...defaultConfig, ...params.parameters.overview };

  // Check if the addon is enabled.
  if (!config.enabled) {
    return story;
  }

  // Check if we have a typedoc to work with.
  if (!typedoc) {
    return storyWithError(
      story,
      // prettier-ignore
      `withOverview decorator is enabled for story '${params.kind} => ${params.name}', but no 'typodoc' parameter was provided.`,
    );
  }

  // Find module documentation by the provided 'filename'.
  const moduleDoc = typedoc.children.find(child => child.name === `"${config.filename}"`);

  if (!moduleDoc) {
    return storyWithError(
      story,
      `Filename '${config.filename}' was not found in the typedoc.\n\nHere's a list of valid filenames in the typedoc:`,
      { filenames: typedoc.children.map(child => child.name.replace(/"/g, '')) },
    );
  }

  // Find the components documentation by the provided 'exportClass'.
  const componentDoc = moduleDoc.children.find(child => child.name === config.exportClass);

  if (!componentDoc) {
    return storyWithError(
      story,
      // prettier-ignore
      `No typedoc found for exportClass '${config.exportClass}'\n\nHere's a list of all the exported classes in the typedoc for '${config.filename}':`,
      { exportClasses: moduleDoc.children.map(child => child.name) },
    );
  }

  const props: OverviewProps = {
    isDebug: config.isDebug,
    features: {
      showTitle: config.showTitle,
      showShortDescription: config.showShortDescription,
      showTags: config.showTags,
      showChangelog: config.showChangelog,
      showLongDescription: config.showLongDescription,
      showUsage: config.showUsage,
      showUsageSource: config.showUsageSource,
      showInputs: config.showInputs,
      showOutputs: config.showOutputs,
      showMethods: config.showMethods,
      showAccessors: config.showAccessors,
      showInternalProps: config.showInternalProps,
    },
    overview: {
      title: config.title,
      filename: config.filename,
      exportClass: config.exportClass,
      shortDescription: getShortDescription(componentDoc),
      tags: getTags(componentDoc),
      changelog: config.changelog,
      longDescription: getLongDescription(componentDoc),
      source: story.template,
      inputs: getInputs(componentDoc),
      outputs: getOutputs(componentDoc),
      exports: getExports(typedoc),
      methods: getMethods(componentDoc),
      accessors: getAccessors(componentDoc),
      internalProps: getInternalProps(componentDoc),
    },
  };

  return storyWithOverview(story, props);
};

export { withOverview };
