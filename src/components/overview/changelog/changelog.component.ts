import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'storybook-addon-overview-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangelogComponent {
  public showAll = false;

  @Input()
  public changelog;

  public get latestChangelog() {
    const latest = this.getVersionIndexes();

    if (latest.length === 1) {
      return this.changelog;
    }

    return this.changelog
      .split('\n')
      .slice(0, latest[1] - 1)
      .join('\n');
  }

  public toggleChangelog = () => (this.showAll = !this.showAll);

  private getVersionIndexes = () => {
    return this.changelog
      .split('\n')
      .map((str, i) => {
        if (str.includes('###')) {
          return i;
        }
      })
      .filter(lineNo => lineNo != null);
  }
}
