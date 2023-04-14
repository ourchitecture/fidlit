import { Component, OnInit } from '@angular/core';
import { AppUpdateService } from './services/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private appUpdateService: AppUpdateService) {}

  ngOnInit() {
    this.appUpdateService.setup();
  }
}
