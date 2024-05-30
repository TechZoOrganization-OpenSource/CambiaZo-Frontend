import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Reviews} from "../../model/reviews/reviews.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseUrl= environment.baseUrl;
  constructor(private http:HttpClient) { }

  getReviews(){
    return this.http.get(`${this.baseUrl}/reviews`)
  }
}