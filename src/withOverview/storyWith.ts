const storyWithError = (story, errorMessage: string, errorObject?: object) => {
  console.error(`[Addon Overview Angular] ${errorMessage}`, errorObject);

  return {
    ...story,
    // prettier-ignore
    template: `<storybook-addon-overview-error [error]="___addonOverviewError"></storybook-addon-overview-error>${story.template}`,
    props: { ___addonOverviewError: { message: errorMessage, object: errorObject }, ...story.props },
  };
};

const storyWithOverview = (story, props) => {
  return {
    ...story,
    // prettier-ignore
    template: `<storybook-addon-overview [config]="___addonOverview">${story.template}</storybook-addon-overview>`,
    props: { ___addonOverview: props, ...story.props },
  };
};

export { storyWithError, storyWithOverview };
