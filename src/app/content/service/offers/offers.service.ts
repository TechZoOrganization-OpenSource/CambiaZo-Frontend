import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offers } from '../../model/offers/offers.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  baseUrl = `${environment.baseUrl}/offers`;

  constructor(private http: HttpClient) {}


  postOffer(offer: Offers): Observable<Offers> {
    return this.http.post<Offers>(this.baseUrl, offer);
  }
}
