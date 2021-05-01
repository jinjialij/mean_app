import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + "/user/signup";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string ){
    const authData: AuthData = {email: email, password: password};
    this.http.post(BACKEND_URL, authData)
    .subscribe(result => {
      console.log(result);
    });
  }
}
