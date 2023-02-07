import { Component, Input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  return [...Array(size).keys()].map((i) => Number(i) + startAt);
}

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-avatar-icon',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarIconComponent {
  @Input() code: string = '01-01';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const avatarIndexes = range(39, 1);

    for (let avatarIndex of avatarIndexes) {
      const code =
        '01-' + (avatarIndex < 10 ? '0' : '') + avatarIndex.toString();

      iconRegistry.addSvgIcon(
        `fidlit-avatar-${code}`,
        sanitizer.bypassSecurityTrustResourceUrl(
          `assets/avatars/avatar-${code}.svg`
        )
      );
    }
  }
}
