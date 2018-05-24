import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {Actuator} from '../model/actuator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serverStatus: string;

  private formSubmitAttempt: boolean;

  constructor(private fb: FormBuilder
    , private authService: AuthService
    , private http: HttpClient
    , public snackBar: MatSnackBar) {
  }

  getServerStatus(): Observable<Actuator> {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8'
    });

    return this.http.get<Actuator>('http://localhost:8080/actuator/health', {headers: httpHeaders});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.serverStatus = '';
    this.getServerStatus().subscribe(actuator => this.serverStatus = actuator.status.valueOf().toLocaleLowerCase());
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.serverStatus !== 'up' || typeof this.serverStatus === 'undefined') {
      this.snackBar.open('Server is down!', 'Error', {
        duration: 2000,
        politeness: 'assertive'
      });
      return;
    }

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
    this.formSubmitAttempt = true;
  }
}
