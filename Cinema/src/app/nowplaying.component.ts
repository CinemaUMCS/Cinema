import {Component, OnInit} from '@angular/core';
import {mod} from 'ngx-bootstrap/bs-moment/utils';

@Component({
  selector: 'app-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowPlayingComponent implements OnInit {

  title = 'app';
  list = [1, 2, 3, 3, 3, 33, 3, 3, 3, 3, 3, 3];
  date = new Date();
  minDate = new Date();
  buttonDates = new Array<any>();
  actualDayOfWeek: number;


  ngOnInit() {
    this.actualDayOfWeek = new Date().getDay();
    this.containDateWithButton();
    console.log(this.buttonDates);
  }

  showYoutube(id): void {
    document.getElementById(id).style.display = 'block';
    document.getElementById('hideYoutubeVid').style.display = 'block';
  }

  hideYoutube(id, frame): void {
    var src = document.getElementById(frame).getAttribute('src');
    document.getElementById(frame).setAttribute('src', src);
    document.getElementById(id).style.display = 'none';
    document.getElementById('hideYoutubeVid').style.display = 'none';
  }


  fun(event) {

  }

  addDaysToActualDate(numberOfDay: number) {
    return new Date(this.date.getTime() + numberOfDay * (60 * 60 * 24 * 1000));
  }

  containDateWithButton() {
    const day = this.actualDayOfWeek;
    for (let i = 0; i < 7; i++) {
      console.log((day + i) % 7);
      this.buttonDates[(day + i) % 7] = this.addDaysToActualDate(i).getDate();
    }
  }
}



