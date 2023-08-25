import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { faUser } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  faUser = faUser;
  employee: Employee = new Employee();
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router : Router){

  }
  ngOnInit(): void{
    if(this.authenticationService.currentUserValue?.id){
      this.router.navigate(['/profile']);
      return;
    }
  }

  register(){
    this.authenticationService.register(this.employee).subscribe(data=>{
      this.router.navigate(['/login']);
    }, err=> {
      if(err?.status === 409){
        this.errorMessage = 'Mail already exist. ';
      } else {
        this.errorMessage = 'Unexpected error occured. Error is: ' + err?.errorMessage
        console.log(err);
      }
    }) 
  }
}