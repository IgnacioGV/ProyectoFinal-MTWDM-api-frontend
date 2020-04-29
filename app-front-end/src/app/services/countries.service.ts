import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL_COUNTRIES='https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {

   }

   getAllCountries(){
     return this.http.get(URL_COUNTRIES)
   }
}
