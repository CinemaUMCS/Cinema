import {Component} from '@angular/core';

import {AuthGuard} from './auth.guard';
import {OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import {ConfigService} from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  constructor() {
  }
}
