import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

type ConfigFeatures = {
  showShortDescription: boolean;
  showTags: boolean;
  showChangelog: boolean;
  showLongDescription: boolean;
  showUsage: boolean;
  showInputs: boolean;
  showOutputs: boolean;
  showExports: boolean;
};

interface OverviewConfig {
  features: ConfigFeatures;
  title: string;
  shortDescription: string;
  tags: Array<any>;
  longDescription: string;
  inputs: Array<any>;
  outputs: Array<any>;
  exports: Array<any>;
}

@Component({
  selector: 'storybook-addon-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  @Input()
  public config: OverviewConfig;
}
