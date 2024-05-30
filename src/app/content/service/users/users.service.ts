import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, map, catchError, of} from "rxjs";
import {Users} from "../../model/users/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;
  loggedIn = false
  validEmail=false
  verificationCode: string = '';

  setVerificationCode(code: string): void {
    this.verificationCode = code;
  }

  verifyCode(code: string): boolean {
    return this.verificationCode === code;
  }

  get isLogged(){return this.loggedIn;}
  set isLogged(val:boolean){this.loggedIn = val;}

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`).pipe(
      map((res: any) => {
        const user = res.find((user: any) => user.email === data.username);
        if (user) {
          if (user.password === data.password) {
            localStorage.setItem('id', user.id);
            return true;
          } else {
            return 'password';
          }
        } else {
          return 'user';
        }
      }),
    );
  }


  verifyEmail(data: any): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/users`).pipe(
      map((res: any) => {
        const user_obj = res.find((user: any) => data.username == user.email);
        if (user_obj) {
          localStorage.setItem('id-temporal', user_obj.id.toString());
          this.validEmail = true;
        } else {
          console.log('User not found');
          this.validEmail = false;
        }
        return this.validEmail;
      })
    );
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
  changePassword(id: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, { password: newPassword });
  }
  changeMembership(id: string, newMembership: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, { membership: newMembership });
  }

  changeMembershipDate(id: string): Observable<any> {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 2;
    const year = today.getFullYear();
    const date = `${day}/${month}/${year}`;

    return this.http.put(`${this.baseUrl}/users/${id}`, { membership_date: date });
  }

}
