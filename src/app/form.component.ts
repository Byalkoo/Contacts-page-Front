import { Component, Input } from '@angular/core';
import { Contact } from './contact';
import { RouterOutlet } from '@angular/router';
import { ApiCallService } from './api-call.Service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';



@Component({
    selector: 'app-form',
    standalone: true,
    imports: [RouterOutlet, NgIf],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    providers: [CookieService]
  })
export class formComponent {
    @Input() contact!: Contact;
    constructor(private apiCallService: ApiCallService, private cookieService: CookieService) {

    }
    token = this.cookieService.get("token")
    ngOnInit(){

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
}
