import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    :host >>>.carousel-control span {
    font-size: 80px;
    color: #c8ff00;
    display: block;
    width: 50px;
    height: 50px;
    background: red;
    top: 46%;
    border-radius: 50%;
    line-height: 1;
  }
  :host >>>.carousel-control span:before {
    display: block;
    line-height: 0.45;
  }
  :host >>> .carousel-indicators li {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: 0.3s;
    margin: 1px;
  }
  :host >>> .carousel{
    top:2rem;
    height:90rem;
  }
  :host >>> .carousel-inner>.item{
    size:10rem;
    height:90rem;
  }
  :host >>> .carousel-caption {
    padding-bottom:40px;
    h3{
        font-size: 32px;
    }
  }
`]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
