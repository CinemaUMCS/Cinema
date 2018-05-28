import {DomSanitizer} from '@angular/platform-browser';

export abstract class BaseHttpService {
  // BASE_URL = 'http://ocenuczelnie.pl/';
  // BASE_URL = 'http://localhost:5000/';
  BASE_URL = 'https://ocenuczelnie.pl/cinema_api/';

  constructor() {
  }

  setUrl(url: string) {
    return this.BASE_URL + url;
  }
}
