import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
  private router: Router) {
}

  gotoNowPlaying(): void {
    this.router.navigateByUrl("/now-playing");
  }
  gotoContact(): void {
    this.router.navigateByUrl("/pricelist");
  }
  gotoPriceList(): void {
    this.router.navigateByUrl("/contact");
  }
}
