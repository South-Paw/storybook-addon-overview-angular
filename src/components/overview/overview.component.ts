import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

@Component({
  selector: 'storybook-addon-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  @Input()
  public config;
}
