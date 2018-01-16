import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    
   _apiURI : string;

   constructor() {
       this._apiURI = 'http://cinemagroupproject.azurewebsites.net';
    }

    getApiURI() {
        return this._apiURI;
    }    
}