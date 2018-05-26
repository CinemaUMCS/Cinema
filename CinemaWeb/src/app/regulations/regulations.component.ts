import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss']
})
export class RegulationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
