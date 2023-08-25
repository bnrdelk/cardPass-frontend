import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private API_URL = 'http://localhost:8080/api/card';

  constructor(private http: HttpClient) { }

  saveCard(card: Card): Observable<any> {
    return this.http.post(`${this.API_URL}`, card);
  }

  deleteCard(card: Card): Observable<any> {
    const deleteUrl = `${this.API_URL}/${card.id}`;
    return this.http.delete(deleteUrl);
  }
  
  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.API_URL);
  }

}
