import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { OverviewProps } from '../../types';

@Component({
  selector: 'storybook-addon-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
  @Input()
  public config: OverviewProps;

  ngOnInit() {
    if (this.config.isDebug) {
      console.info('OverviewComponent.onInit', this.config);
    }
  }

  public get renderTitle() {
    return this.config.features.showTitle && this.config.overview.title && this.config.overview.title.length > 0;
  }

  public get renderShortDescription() {
    return (
      this.config.features.showShortDescription &&
      this.config.overview.shortDescription &&
      this.config.overview.shortDescription.length > 0
    );
  }

  public get renderTags() {
    return this.config.features.showTags && this.config.overview.tags && this.config.overview.tags.length > 0;
  }

  public get renderChangelog() {
    return (
      this.config.features.showChangelog && this.config.overview.changelog && this.config.overview.changelog.length > 0
    );
  }

  public get showLongDescription() {
    return (
      this.config.features.showLongDescription &&
      this.config.overview.longDescription &&
      this.config.overview.longDescription.length > 0
    );
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
    return this.config.features.showInputs && this.config.overview.inputs && this.config.overview.inputs.length > 0;
  }

  public get showOutputs() {
    return this.config.features.showOutputs && this.config.overview.outputs && this.config.overview.outputs.length > 0;
  }

  public get showClassProperties() {
    return (
      this.config.features.showMethods || this.config.features.showAccessors || this.config.features.showInternalProps
    );
  }

  public get showMethods() {
    return this.config.features.showMethods && this.config.overview.methods && this.config.overview.methods.length > 0;
  }

  public get showAccessors() {
    return (
      this.config.features.showAccessors && this.config.overview.accessors && this.config.overview.accessors.length > 0
    );
  }

  public get showInternalProps() {
    return (
      this.config.features.showInternalProps &&
      this.config.overview.internalProps &&
      this.config.overview.internalProps.length > 0
    );
  }
}
