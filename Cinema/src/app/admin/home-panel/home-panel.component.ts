import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss']
})
export class HomePanelComponent implements OnInit {
  mode = new FormControl('side');
  constructor() { }

  ngOnInit() {
  }

}
