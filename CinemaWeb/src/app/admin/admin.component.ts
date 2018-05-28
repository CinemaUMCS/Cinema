import { Component, OnInit } from '@angular/core';
import { DummyServiceService } from '../services/dummy-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [DummyServiceService]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
