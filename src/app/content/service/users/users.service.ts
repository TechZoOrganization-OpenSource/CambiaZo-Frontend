import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/users`)
  }

  postUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/users`, data)
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }

  
}
