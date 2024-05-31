import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OffersService {


  baseUrl= environment.baseUrl;
  constructor(private http:HttpClient) { }

  getOffers(){
    return this.http.get(`${this.baseUrl}/offers`)
  }
  updateOfferStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/offers/${id}`, { status: status });
  }

  postOffer(offer: Offers): Observable<Offers> {
    return this.http.post<Offers>(this.baseUrl, offer);

  }
}
