import {
  Tag,
  TypedocInput,
  TypedocOutput,
  TypedocExport,
  TypedocMethod,
  TypedocAccessor,
  TypedocInternalProp,
} from '../types';

// Reference: https://typedoc.org/api/enums/reflectionkind.html
const TYPEDOC_CLASS = 128;
const TYPEDOC_PROPERTY = 1024;
const TYPEDOC_METHOD = 2048;

const IGNORED_KINDS = [TYPEDOC_CLASS];

const getShortDescription = ({ comment }): string => {
  return comment ? comment.shortText : null;
};

const getTags = ({ comment }): Tag[] => {
  if (comment && comment.tags && comment.tags.length > 0) {
    return comment.tags.map(
      ({ tag, text }): Tag => ({
        tag: tag.split('_').join(' '),
        label: text,
      }),
    );
  }

  return [];
};

const getLongDescription = ({ comment }): string => {
  return comment ? comment.text : null;
};

const getInputs = ({ children }): TypedocInput[] => {
  if (!children) {
    return [];
  }

  return children.filter(({ decorators }) =>
    decorators ? decorators.filter(decorator => decorator.name === 'Input').length : false,
  );
};

const getOutputs = ({ children }): TypedocOutput[] => {
  if (!children) {
    return [];
  }

  return children.filter(({ decorators }) =>
    decorators ? decorators.filter(decorator => decorator.name === 'Output').length : false,
  );
};

const getExports = ({ children }): TypedocExport[] => {
  if (!children) {
    return [];
  }

  return children
    .filter(child => child.children)
    .map(child => child.children.filter(({ kind }) => !IGNORED_KINDS.includes(kind)))
    .flat();
};

const getMethods = ({ children }): TypedocMethod[] => {
  if (!children) {
    return [];
  }

  return children.filter(({ kind }) => (kind ? kind === TYPEDOC_METHOD : false));
};

const getAccessors = ({ children }): TypedocAccessor[] => {
  if (!children) {
    return [];
  }

  return children
    .filter(
      ({ getSignature, setSignature }) =>
        (getSignature && getSignature.length > 0) || (setSignature && setSignature.length > 0),
    )
    .filter(({ decorators }) =>
      decorators && decorators.length > 0 ? !decorators.find(({ name }) => ['Input', 'Output'].includes(name)) : true,
    );
};

const getInternalProps = ({ children }): TypedocInternalProp[] => {
  if (!children) {
    return [];
  }

  return children.filter(({ kind, decorators }) => kind && !decorators && kind === TYPEDOC_PROPERTY);
};

export {
  getShortDescription,
  getTags,
  getLongDescription,
  getInputs,
  getOutputs,
  getExports,
  getMethods,
  getAccessors,
  getInternalProps,
};
