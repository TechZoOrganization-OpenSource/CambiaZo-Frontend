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
         if( user_obj.phone === data.password){
            localStorage.setItem('id',user_obj.id)
            this.loggedIn = true;
           } else console.log('password incorrect')
        } else console.log('user not found')
        return this.loggedIn;
    })
    )

  }

  getUserById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/users/${id}`)
  }

  postUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/users`, data)
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }

}
