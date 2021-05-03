import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient) { }

  getToken(){ return this.token; }

  createUser(email: string, password: string ){
    const authData: AuthData = {email: email, password: password};
    this.http.post(BACKEND_URL + "/signup", authData)
    .subscribe(result => {
      console.log(result);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string}>(BACKEND_URL + "/login", authData)
    .subscribe(response=>{
      console.log(response);
      const token = response.token;
      this.token = token;
    });
  }
}
