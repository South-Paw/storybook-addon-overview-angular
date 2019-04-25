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

  public getIfPropRequired(prop) {
    if (prop.comment && prop.comment.tags && prop.comment.tags.length > 0) {
      return !!prop.comment.tags.filter(({ tag }) => tag === 'required')[0];
    }

    return false;
  }
  public getRenderableTypes(prop) {
    let propType;

    if (!prop.type) {
      if (prop.setSignature && prop.setSignature.length > 0){
        propType = prop.setSignature[0].type;
      } else if (prop.getSignature && prop.getSignature.length > 0) {
        propType = prop.getSignature[0].type;
      } else if (prop.signatures && prop.signatures.length > 0) {
        propType = prop.signatures[0].type || {name : 'void'};
      }
    } else {
      propType = prop.type
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

  getMethodSignature(prop) {
    if (prop.signatures) {
      if(prop.signatures[0].parameters) {
        let template = `function(`
        const parameters = prop.signatures[0].parameters
        parameters.forEach((param, i:number) => {
          template += `${param.name}`
          template += param.type ? `:${param.type.name}` : ``
          template += (i < parameters.length-1) ? `, ` : ``
        });
        template += `)`
        return template
      }
    } else if (prop.getSignature){

    }
  }

}
