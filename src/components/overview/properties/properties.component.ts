import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'storybook-addon-overview-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesComponent {
  @Input()
  public exported;

  @Input()
  public props;

  public get publicProps() {
    return this.props.filter(prop => prop.flags && !(prop.flags.isProtected || prop.flags.isPrivate) === true);
  }

  public getIfDeprecated(prop) {
    if (prop.comment && prop.comment.tags && prop.comment.tags.length > 0) {
      return !!prop.comment.tags.find(({ tag }) => tag === 'deprecated');
    }

    return false;
  }

  public getIfPropRequired(prop) {
    if (prop.comment && prop.comment.tags && prop.comment.tags.length > 0) {
      return !!prop.comment.tags.find(({ tag }) => tag === 'required');
    }

    return false;
  }

  private renderParameterString = parameters =>
    parameters
      .map((param, i) => {
        let str = '';
        str += `${param.name}`;
        str += param.type.name ? `: ${param.type.name}` : `: ${param.type.types.map(t => t.name).join(' | ')}`;
        str += i < parameters.length - 1 ? `, ` : ``;
        return str;
      })
      .join('');

  public getSetterSignature(prop) {
    if (prop.signatures && prop.signatures[0].parameters) {
      return `(${this.renderParameterString(prop.signatures[0].parameters)})`;
    }

    if (prop.setSignature && prop.setSignature[0]) {
      return `set(${this.renderParameterString(prop.setSignature[0].parameters)})`;
    }
  }

  public getGetterSignature(prop) {
    if (prop.decorators && prop.decorators.filter(decorator => decorator.name === 'Input').length === 1) {
      return false;
    }

    if (prop.getSignature) {
      return 'get()';
    }

    return false;
  }

  public getComment(prop) {
    if (!prop.comment && prop.signatures && prop.signatures.length > 0 && prop.signatures[0].comment) {
      return prop.signatures[0].comment;
    }

    if (
      prop.decorators &&
      prop.decorators.filter(decorator => decorator.name === 'Input').length === 1 &&
      prop.setSignature &&
      prop.setSignature.length > 0 &&
      prop.setSignature[0].comment
    ) {
      return prop.setSignature[0].comment;
    }

    return prop.comment;
  }

  public getRenderableTypes(prop) {
    let propType = null;

    if (!prop.type) {
      if (prop.setSignature && prop.setSignature.length > 0) {
        propType = prop.setSignature[0].type;
      } else if (prop.getSignature && prop.getSignature.length > 0) {
        propType = prop.getSignature[0].type;
      } else if (prop.signatures && prop.signatures.length > 0) {
        propType = prop.signatures[0].type || { name: 'void' };
      }
    } else {
      propType = prop.type;
    }

    switch (typeof propType === 'string' ? propType : propType.type) {
      case 'reference':
        return this.resolveReference(propType.id);
      case 'union':
        return { meta: 'One of', types: propType.types };
      case 'enum':
        return { type: propType.name };
      case 'interface':
        return { type: propType.name };
      default:
        break;
    }
  }

  private resolveReference(id) {
    const reference = this.exported.filter(member => member.id === id)[0];

    if (!reference) {
      return;
    }

    if (reference.type) {
      return this.getRenderableTypes(reference);
    }

    if (reference.children) {
      switch (reference.kind) {
        case 4: // Enum
          return this.getRenderableTypes({ type: { type: 'enum', name: reference.name } });
        case 256: // Interface
          return this.getRenderableTypes({ type: { type: 'interface', name: reference.name } });
        default:
          return;
      }
    }
  }
}
