import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  baseUrl: string = 'https://languages-api-java.herokuapp.com/api/languages'

  constructor(private httpClient: HttpClient) { }

  getAllLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.baseUrl)
  }

  getLanguageByName(name: string): Observable<Language> {
    let encoded = encodeURIComponent(name);
    return this.httpClient.get<Language>(this.baseUrl+'/'+encoded)
  }

  voteLanguageByName(name: string): Observable<Language> {
    let encoded = encodeURIComponent(name);
    return this.httpClient.patch<Language>(this.baseUrl+'/'+encoded,{})
  }

  addLanguage(language: Language): Observable<Language> {
    return this.httpClient.post<Language>(this.baseUrl+'/add',language)
  }

  deleteLanguageByName(name: string): Observable<Language> {
    let encoded = encodeURIComponent(name);
    return this.httpClient.delete<Language>(this.baseUrl+'/'+encoded)
  }


}
