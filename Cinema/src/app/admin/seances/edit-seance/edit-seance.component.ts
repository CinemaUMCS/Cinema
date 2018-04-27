import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-seance',
  templateUrl: './edit-seance.component.html',
  styleUrls: ['./edit-seance.component.scss']
})
export class EditSeanceComponent implements OnInit {
  seanceForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
