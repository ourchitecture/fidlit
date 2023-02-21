import { Component } from '@angular/core';

import { ScrollDetail } from '@ionic/angular';

var debounce = function (fn: Function) {
  // Setup a timer
  var timeout: any;

  // Return a function to run debounced
  return function (this: any, ...args: any[]) {
    // Setup the arguments
    var context: any = this;

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
      fn.apply(context, args);
    });
  };
};

@Component({
  selector: 'app-updates',
  templateUrl: './updates.page.html',
  styleUrls: ['./updates.page.scss'],
})
export class UpdatesPage {
  scrollY = 0;

  private onScrollDebounced = debounce(function (this: any, ...args: any[]) {
    if (args.length === 1) {
      const detail = args[0] as ScrollDetail;
      // console.log('debounced scroll', detail);
      this.scrollY = detail.currentY;
    }
  });

  onScroll(evt: CustomEvent<ScrollDetail>) {
    this.onScrollDebounced(evt.detail);
  }
}
