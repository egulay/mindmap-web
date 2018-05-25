import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginUser} from '../model/loginUser';
import {BehaviorSubject, Observable} from 'rxjs';
import User = AuthorizedUser.User;
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    this.loggedIn.next(localStorage.getItem('access_token') !== null);
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
  }

  login(user: LoginUser) {
    if (user.userName !== '' && user.password !== '') {
      this.obtainAccessToken(user);
    }
  }

  obtainActiveUser(): Observable<User> {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8'
      , 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<User>('http://localhost:8080/api/user/', {headers: httpHeaders});
  }

  saveToken(token) {
    localStorage.setItem('access_token', token);
    this.loggedIn.next(true);
    console.log('Access token obtained');
    this.router.navigate(['/dashboard']);
  }

  obtainAccessToken(user: LoginUser) {
    let params = new HttpParams();
    params = params.append('username', user.userName);
    params = params.append('password', user.password);
    params = params.append('grant_type', 'password');
    params = params.append('client_id', 'mindmap');

    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded'
      , 'Authorization': 'Basic ' + btoa('mindmap:secret')
      , 'Accept': 'application/json'
    });

    this.http.post<LoginResponse>('http://localhost:8080/oauth/token', params, {headers: httpHeaders}).subscribe((data) => {
        this.saveToken(data.access_token);
        this.loggedIn.next(true);
      }, () => this.snackBar.open('Invalid Credentials', 'Error', {
        duration: 2000,
        politeness: 'polite'
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
