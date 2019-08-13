export interface OverviewConfig {
  enabled?: boolean;
  isDebug?: boolean;

  // Story
  title: string;
  filename: string;
  exportClass: string;
  changelog?: string;

  // Features
  showTitle?: boolean;
  showShortDescription?: boolean;
  showTags?: boolean;
  showChangelog?: boolean;
  showLongDescription?: boolean;
  showUsage?: boolean;
  showUsageSource?: boolean;
  showInputs?: boolean;
  showOutputs?: boolean;
  showMethods?: boolean;
  showAccessors?: boolean;
  showInternalProps?: boolean;
}

export interface Tag {
  tag: string;
  label: string;
}

export interface TypedocInput {}

export interface TypedocOutput {}

export interface TypedocExport {}

export interface TypedocMethod {}

export interface TypedocAccessor {}

export interface TypedocInternalProp {}

export interface OverviewProps {
  isDebug: boolean;
  features: {
    showTitle: boolean;
    showShortDescription: boolean;
    showTags: boolean;
    showChangelog: boolean;
    showLongDescription: boolean;
    showUsage: boolean;
    showUsageSource: boolean;
    showInputs: boolean;
    showOutputs: boolean;
    showMethods: boolean;
    showAccessors: boolean;
    showInternalProps: boolean;
  };
  overview: {
    title: string;
    filename: string;
    exportClass: string;
    shortDescription: string;
    tags: Tag[];
    changelog: string;
    longDescription: string;
    source: string;
    exports: TypedocExport[];
    inputs: TypedocInput[];
    outputs: TypedocOutput[];
    methods: TypedocMethod[];
    accessors: TypedocAccessor[];
    internalProps: TypedocInternalProp[];
  };
}
