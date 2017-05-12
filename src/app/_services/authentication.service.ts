import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  public token: string;
  private loginUrl: string = '/api/login';
  private registerUrl: string = '/api/register';
  private recoveryUrl: string = '/api/passrecover';

  constructor(private http: Http, private router: Router) {
      // set token if saved in local storage
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }


  private isUserLoggedIn() {
    if(JSON.parse(localStorage.getItem('currentUser'))!=null) return true;
    else return false;
  }

  private login(username: string, password: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, JSON.stringify({ email: username, password: password }), options)
                    .map((response: Response) => {
                        // login successful if there's a jwt token in the response
                        let token = response.json() && response.json().token;
                        if (token) {
                            // set token property
                            this.token = token;

                            // store username and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                            // return true to indicate successful login
                            return true;
                        } else {
                            // return message to indicate failed login
                            throw response.json().message;
                        }
                    })
                    .catch((response: Response) => {
                      throw response.json().message;
                    });
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

  private register(username: string, password: string, name: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.registerUrl, JSON.stringify({ name: name, email: username, password: password }), options)
        .map((response: Response) => {
            // register successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                throw response.json().message;
            }
        })
      .catch((response: Response) => {
        throw response.json().message;
      });
  }

  private recoverPassword(email: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.recoveryUrl, JSON.stringify({ email: email }), options)
                    .map((response: Response) => {
                      if(response.json()="ok") {
                          return true;
                      }
                      else {
                          throw response.json().message;
                        }
                      })
                      .catch((response: Response) => {
                        throw response.json().message;
                      });
  }

}
