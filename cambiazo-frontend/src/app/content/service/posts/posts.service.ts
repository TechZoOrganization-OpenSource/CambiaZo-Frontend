import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }

  getProducs():Observable<any>{
    return this.http.get(`${this.baseUrl}/products`)
  }

  getCategoriesProducts():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories-objects`)
  }
}
