import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Memberships} from "../../model/memberships/memberships.model";

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {
  baseUrl = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Memberships endpoints
  getMemberships(): Observable<Memberships[]> {
    return this.http.get<Memberships[]>(`${this.baseUrl}/api/v1/membership`);
  }

  postMembership(data: Memberships): Observable<Memberships> {
    return this.http.post<Memberships>(`${this.baseUrl}/api/v1/membership`, data, { headers: this.headers });
  }

  deleteMembership(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/v1/membership/delete/${id}`, { headers: this.headers });
  }

  putMembership(id: string, data: Memberships): Observable<Memberships> {
    return this.http.put<Memberships>(`${this.baseUrl}/api/v1/membership/${id}`, data, { headers: this.headers });
  }

  getMembershipById(id: string): Observable<Memberships> {
    return this.http.get<Memberships>(`${this.baseUrl}/api/v1/membership/${id}`, { headers: this.headers });
  }

  // Benefits endpoints
  getBenefits(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/benefits`, { headers: this.headers });
  }

  postBenefit(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/benefits`, data, { headers: this.headers });
  }

  deleteBenefit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/v1/benefits/delete/${id}`, { headers: this.headers });
  }

  getBenefitById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/benefits/${id}`, { headers: this.headers });
  }

  getBenefitsByMembershipId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/benefits/membership/${id}`, { headers: this.headers });
  }
}
