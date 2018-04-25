export abstract class BaseHttpService {
  BASE_URL = 'http://localhost:5000/';

  constructor() {
  }

  setUrl(url: string) {
    return this.BASE_URL + url;
  }
}
