import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Employee } from '../model/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<Employee>;
  private currentUserSubject: BehaviorSubject<Employee>;

  private API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { 
    let storageUser;
    //localStorage'da veriler String olarak saklanır o yüzden +Str var ile aldık
    const storageUserAsStr = localStorage.getItem('currentUser');
    if(storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<Employee>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): Employee {
    return this.currentUserSubject.value; 
  }

  login(employee: Employee): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/authentication/sign-in', employee).pipe(
      map(response => {
        if(response){
          localStorage.setItem('currentUser',JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  register(employee: Employee): Observable<any> {
    return this.http.post(this.API_URL + 'api/authentication/sign-up', employee);
}

logOut(){
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(new Employee);
}
}