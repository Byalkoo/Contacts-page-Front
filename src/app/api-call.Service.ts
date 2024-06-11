import { HttpHeaders, HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "./contact";
import { StickyDirection } from "@angular/cdk/table";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class ApiCallService {

    constructor(private httpclient: HttpClient) { }


          

    getContact(): Observable<any> {
        return this.httpclient.get('http://localhost:5272/api/Contacts/GetAllContacts')
    }

    callApi(newContact: object, x: number, token: string): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-type', 'application/json')
        .append('Authorization', `Bearer ${token}`);
        if(x == 2) {
            var url = 'http://localhost:5272/api/Contacts/EditContact';
        }else {
            var url = 'http://localhost:5272/api/Contacts/AddContact';
        }
        return this.httpclient.post(url, newContact, {
            headers: headers
        })
    }
    ApiLogin(email: string, password: string) {
        const headers = new HttpHeaders()
        .append('Content-type', 'application/json')
        const params = new HttpParams()
        .append("Email", email)
        .append("Password", password);       
        return this.httpclient.post('http://localhost:5272/login', null, {
            headers: headers,
            params: params
        })
    }
}
