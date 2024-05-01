import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OngsService {

  baseUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getOngs():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/ongs`)
  }

  getCategoriesOngs():Observable<any>{
    return this.http.get(`${this.baseUrl}/categories-ongs`)
  }
}
