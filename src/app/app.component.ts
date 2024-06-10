import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact } from './contact';
import { ApiCallService } from './api-call.Service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { formComponent } from './form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, CommonModule, formComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CookieService]
})
export class AppComponent {
  title = 'my-app';
  toggleStepper = false;
  number = 0;
  @Output() onPlusClick = new EventEmitter<boolean>();

  click() {
    this.onPlusClick.emit(true);
  }

  contactList!: Contact[];
  dataSource: any;
  constructor(private apiCallService: ApiCallService, private cookieService: CookieService) {

  }
  ngOnInit() {
    this.fetchContact()
  }
  fetchContact(){
    this.apiCallService.getContact().subscribe(data=> {
      this.contactList = data
      console.log(this.contactList)
    })
  }
  public sendAddRequest(Name: string, LastName: string, Email: string, Phone: string, Category: string, CategorySecondary: string, DateOfBirth: string, Password: string, PasswordCheck: string) {
    console.log(Password)
    console.log(PasswordCheck)
    if(Password == PasswordCheck) {
      var x = {
        "name": Name,
        "lastName": LastName,
        "email": Email,
        "password": Password,
        "category": Category,
        "dateOfBirth": DateOfBirth,
        "phone": parseInt(Phone),
      }
      this.apiCallService.callApi(x, 1, this.cookieService.get("token")).subscribe( {
        next: (res : any) => {
          console.log(res)
        },
        error: (err: any) => {
          console.log(err)
        }    
    })
    this.fetchContact()
    }

  }
  public login(email: string, password: string) {
    this.apiCallService.ApiLogin(email, password).subscribe({
      next: (res : any) => {
        this.cookieService.set("token", res["token"], 0.01)
      },
      error: (err: any) => {
        console.log(err)
      }   
    })
  }
}
