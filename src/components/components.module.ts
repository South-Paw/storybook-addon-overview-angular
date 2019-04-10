import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

import { ErrorComponent } from './error/error.component';
import { ChangelogComponent } from './overview/changelog/changelog.component';
import { ExampleComponent } from './overview/example/example.component';
import { PropertiesComponent } from './overview/properties/properties.component';
import { TypesComponent } from './overview/properties/types/types.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [CommonModule, MarkdownModule.forRoot()],
  declarations: [ErrorComponent, ChangelogComponent, ExampleComponent, PropertiesComponent, TypesComponent, OverviewComponent],
  exports: [ErrorComponent, OverviewComponent],
})
export class OverviewModule {}
