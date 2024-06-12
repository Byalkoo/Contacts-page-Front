import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiCallService {

    constructor(private httpclient: HttpClient) { }

    url = 'http://localhost:5272' // Change in order to test
          
    // Get data from api
    getContact(): Observable<any> {
        return this.httpclient.get(`${this.url}/api/Contacts/GetAllContacts`)
    }
    // Send post request to api
    callApi(newContact: object, x: number, token: string): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-type', 'application/json')
        .append('Authorization', `Bearer ${token}`);
        if(x == 2) {
            var url = `${this.url}/api/Contacts/EditContact`;
        }else {
            var url = `${this.url}/api/Contacts/AddContact`;
        }
        return this.httpclient.post(url, newContact, {
            headers: headers
        })
    }
    // Send login request
    ApiLogin(email: string, password: string) {
        const headers = new HttpHeaders()
        .append('Content-type', 'application/json')
        const params = new HttpParams()
        .append("Email", email)
        .append("Password", password);       
        return this.httpclient.post(`${this.url}/login`, null, {
            headers: headers,
            params: params
        })
    }
}
