import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environmentts/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // public route:String;
  constructor() { }
 
  getRoute(){
    return environment.ApiPath;
  }
}
