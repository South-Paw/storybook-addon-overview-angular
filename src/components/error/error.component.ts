import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'storybook-addon-overview-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input()
  public error;
}
