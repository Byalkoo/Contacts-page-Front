import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact } from './contact';
import { ApiCallService } from './api-call.Service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { formComponent } from './form.component';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, CommonModule, formComponent, AddUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CookieService]
})
export class AppComponent {
  title = 'my-app';
  toggleEdit = false;
  toggleAdd = false;
  number = 0;
  token = this.cookieService.get("token");
  loginErr = ""

  contactList!: Contact[];
  dataSource: any;
  constructor(private apiCallService: ApiCallService, private cookieService: CookieService) {

  }
  ngOnInit() {
    this.fetchContact()
    console.log(this.token)
  }
  // Inserts data into variable for later use in html
  fetchContact(){
    this.apiCallService.getContact().subscribe(data=> {
      this.contactList = data
      console.log(this.contactList)
    })
  }
  // Sends login request and saves token in cookies
  public login(email: string, password: string) {
    this.apiCallService.ApiLogin(email, password).subscribe({
      next: (res : any) => {
        this.cookieService.set("token", res["token"], 0.01)
        window.location.reload()
      },
      error: (err: any) => {
        console.log(err)
        this.loginErr = "Nie prawidlowy email albo haslo"
      }   
    })
    this.ngOnInit();
  }
}
