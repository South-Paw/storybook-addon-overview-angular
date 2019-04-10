import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

interface IFeatures {
  showTitle: boolean;
  showShortDescription: boolean;
  showTags: boolean;
  showChangelog: boolean;
  showLongDescription: boolean;
  showUsage: boolean;
  showUsageSource: boolean;
  showInputs: boolean;
  showOutputs: boolean;
}

interface ITag {
  tag: string;
  label: string;
  href?: string;
}

interface IConfig {
  isDebug: boolean;
  features: IFeatures;
  title: string;
  shortDescription: string;
  tags: ITag[];
  changelog: string;
  longDescription: string;
  source: string;
  inputs: object[];
  outputs: object[];
  exports: object[];
}

@Component({
  selector: 'storybook-addon-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
  @Input()
  public config: IConfig;

  ngOnInit() {
    if (this.config.isDebug) {
      console.info('OverviewComponent.onInit', this.config);
    }
  }

  public get renderTitle() {
    return this.config.features.showTitle && this.config.title && this.config.title.length > 0;
  }

  public get renderShortDescription() {
    return this.config.features.showShortDescription && this.config.shortDescription && this.config.shortDescription.length > 0;
  }

  public get renderTags() {
    return this.config.features.showTags && this.config.tags && this.config.tags.length > 0;
  }

  public get renderChangelog() {
    return this.config.features.showChangelog && this.config.changelog && this.config.changelog.length > 0;
  }

  public get showLongDescription() {
    return this.config.features.showLongDescription && this.config.longDescription && this.config.longDescription.length > 0;
  }

  public get showUsage() {
    return this.config.features.showUsage;
  }

  public get showUsageSource() {
    return this.config.features.showUsageSource;
  }

  public get showProperties() {
    return this.config.features.showInputs || this.config.features.showOutputs;
  }

  public get showInputs() {
    return this.config.features.showInputs && this.config.inputs && this.config.inputs.length > 0;
  }

  public get showOutputs() {
    return this.config.features.showOutputs && this.config.outputs && this.config.outputs.length > 0;
  }
}
