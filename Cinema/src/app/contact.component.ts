import {Component, OnInit} from '@angular/core';
import {HeaderOpacityService} from './shared/header-opacity.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  title = 'app';
  constructor(private headerOpacityService: HeaderOpacityService){
  }
  ngOnInit(): void {
    this.isDashboardComponent();
  }
  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }
}
