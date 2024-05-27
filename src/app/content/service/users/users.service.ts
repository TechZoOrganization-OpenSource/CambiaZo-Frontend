import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable,map} from "rxjs";
import {Users} from "../../model/users/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;
  loggedIn = false
  get isLogged(){return this.loggedIn;}
  set isLogged(val:boolean){this.loggedIn = val;}

  constructor(private http: HttpClient) {}

  login(data:any): Observable<any>{

    return this.http.get(`${this.baseUrl}/users`).pipe(
      map((res:any)=>{
         const user_obj = res.find((user: any) => data.username == user.email);
        if (user_obj) {
         if( user_obj.password === data.password){
            localStorage.setItem('id',user_obj.id)
            this.loggedIn = true;
           } else console.log('password incorrect')
        } else console.log('user not found')
        return this.loggedIn;
    })
    )

  }


  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`)
  }
  postUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, data);
  }
  deleteUser(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }
  putUser(id:string,data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/users/${id}`,data)
  }
  getUserById(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/users/${id}`)
  }


}
