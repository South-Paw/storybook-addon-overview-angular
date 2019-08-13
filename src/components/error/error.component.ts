import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

interface OverviewError {
  message: string;
  object: object;
}

@Component({
  selector: 'storybook-addon-overview-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input()
  public error: OverviewError;
}
