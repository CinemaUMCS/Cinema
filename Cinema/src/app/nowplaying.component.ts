import { Component } from '@angular/core';

@Component({
  selector: 'now-playing-list',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowPlayingComponent {
  title = 'app';

  showYoutube(id): void{
    document.getElementById(id).style.display = "block";
    document.getElementById('hideYoutubeVid').style.display = "block";
  }

  hideYoutube(id, frame): void{
    var src = document.getElementById(frame).getAttribute("src");
    document.getElementById(frame).setAttribute("src",src);
    document.getElementById(id).style.display = "none";
    document.getElementById('hideYoutubeVid').style.display = "none";
  }
}
