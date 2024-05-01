import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {

  baseUrl = environment.baseUrl;
  constructor(private htpp: HttpClient) { }

  getMemberShips(): Observable<any> {
    return this.htpp.get<any>(`${this.baseUrl}/memberships`)
  }
}
