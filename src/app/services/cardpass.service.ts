import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tempcard } from '../model/tempcard.model';

@Injectable({
  providedIn: 'root'
})

export class CardpassService {

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<tempcard[]> {
    return this.http.get<tempcard[]>('http://localhost:8080/api/latecomers');
  }

  getLatecomers(tarih: string): Observable<tempcard[]> {
    let params = new HttpParams();
    params = params.append('prmTarih',tarih);

    return this.http.get<tempcard[]>('http://localhost:8080/api/latecomers',{params: params});
  }

  sendMails(prmTarih: string, ids: number[]) {
    var splittedPrmTarih = prmTarih.split(" ", 2);
    var prmTarih1 = splittedPrmTarih[0];
    const body = { prmTarih1, ids };
    console.log(body);
    return this.http.post('http://localhost:8080/api/sendmails', body);
  }
  

}
