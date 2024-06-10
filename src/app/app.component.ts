import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact } from './contact';
import { ApiCallService } from './api-call.Service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CookieService]
})
export class AppComponent {
  title = 'my-app';

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
  public sendEditRequest(contact: Contact, Name: string, LastName: string, Email: string, Phone: string, Category: string, CategorySecondary: string ,DateOfBirth: string, Password: string) {
    var x = {
      "name": Name,
      "lastName": LastName,
      "email": Email,
      "password": Password,
      "category": Category,
      "dateOfBirth": DateOfBirth,
      "phone": parseInt(Phone),
      "oldEmail": contact.Email
    }
    this.apiCallService.callApi(x, 2, this.cookieService.get("token")).subscribe( {
      next: (res : any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
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
