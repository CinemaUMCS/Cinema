import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
  }

  starTable = [1, 2, 3, 4, 5];

  ngOnInit() {
  }

}
