import { Component } from '@angular/core';
import { ApiCallService } from '../api-call.Service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NgIf],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  ngOnInit() {

  }
  constructor(private apiCallService: ApiCallService, private cookieService: CookieService) {}
  public sendAddRequest(Name: string, LastName: string, Email: string, Phone: string, Category: string, CategorySecondary: string, DateOfBirth: string, Password: string, PasswordCheck: string) {
    if(Password == PasswordCheck && Password != "") {
      var x = {
        "name": Name,
        "lastName": LastName,
        "email": Email,
        "password": Password,
        "category": Category,
        "categorySecondary": CategorySecondary,
        "dateOfBirth": DateOfBirth,
        "phone": parseInt(Phone),
      }
      this.apiCallService.callApi(x, 1, this.cookieService.get("token")).subscribe( {
        next: (res : any) => {
          console.log(res)
        },
        error: (err: any) => {
          console.log(err)
          alert("Kontakt z takim emailem juz istnieje")
        }    
    })
    }

  }
}
