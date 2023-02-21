import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-lorem-ipsum',
  templateUrl: './lorem-ipsum.component.html',
  styleUrls: ['./lorem-ipsum.component.scss'],
})
export class LoremIpsumComponent {
  @Input() paragraphCount = 1;
}
