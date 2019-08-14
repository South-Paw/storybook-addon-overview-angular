export interface OverviewConfig {
  /** Required to enable the overview components on the story. */
  enabled?: boolean;

  /**
   * Turn on debugging mode of the overview component. Helpful to inspect the generated TypeDoc for your inputs and
   * outputs.
   */
  isDebug?: boolean;

  /** The title of this overview story. */
  title: string;

  /**
   * The name of the component's file as exported by typedoc. If you get this wrong, the overview component will render
   * an error which you can use to help you find the right name. The error will list all valid `filename` items from
   * the TypeDoc.
   */
  filename: string;

  /**
   * The exported class name of the component. If you get this wrong, the overview component will render an error
   * which you can use to help you find the right class name. The error will list all valid `exportClass` items from
   * the TypeDoc.
   */
  exportClass: string;

  /** Changelog you wish to render in the overview component. If no changelog is provided, it won't be rendered. */
  changelog?: string;

  /** Whether to show the title in the overview component. */
  showTitle?: boolean;

  /**
   * Whether to show the short description in the overview component. This is generated from the first line of the
   * component's documentation block.
   */
  showShortDescription?: boolean;

  /**
   * Whether to show the tags in the overview component. These are generated from the components documentation block
   * and support markdown syntax.
   */
  showTags?: boolean;

  /**
   * Whether to show the changelog in the overview component. If no `changelog` is provided, it won't be rendered
   * anyway.
   */
  showChangelog?: boolean;

  /**
   * Whether to show the long description in the overview component. This is generated from the everything after the
   * first line of the component's documentation block. Note: the long description also supports markdown from the
   * component's documentation block.
   */
  showLongDescription?: boolean;

  /** Whether to show the example usage of the component you're documenting. */
  showUsage?: boolean;

  /** If the usage example's source code is open or closed when the story is viewed. */
  showUsageSource?: boolean;

  /** Whether to render the `@Input()` members of the component. */
  showInputs?: boolean;

  /** Whether to render the `@Output()` members of the component. */
  showOutputs?: boolean;

  /** Whether to render the public methods of the component's class. */
  showMethods?: boolean;

  /** Whether to render the public `get`/`set` accessors of the component's class. */
  showAccessors?: boolean;

  /** Whether to render the public properties/members of the component's class. */
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
