import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MovieModel} from '../../model/movie.model';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.scss']
})
export class DescriptionDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MovieModel) {
  }

  ngOnInit() {
  }

}
