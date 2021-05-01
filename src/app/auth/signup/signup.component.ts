import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  onSignup(form: NgForm){
    // console.log(form.value);
    if (form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
