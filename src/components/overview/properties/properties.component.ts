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

  public getRenderableTypes(propType) {
    switch (propType.type) {
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
      return this.getRenderableTypes(reference.type);
    }

    if (reference.children)
      switch (reference.kind) {
        case 4: // Enum
          return this.getRenderableTypes({ ...reference, type: 'enum' });
        case 256: // Interface
          return this.getRenderableTypes({ ...reference, type: 'interface' });
        default:
          return;
      }
  }
}
