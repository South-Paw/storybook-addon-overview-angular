import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'storybook-addon-overview-property-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesComponent {
  @Input()
  public types;
}
