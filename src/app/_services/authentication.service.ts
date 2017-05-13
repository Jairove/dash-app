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
  private recoveryUrl: string = '/api/recoverpass';

  constructor(private http: Http, private router: Router) {
      // set token if saved in local storage
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }


  public isUserLoggedIn() {
    if(JSON.parse(localStorage.getItem('currentUser'))!=null) return true;
    else return false;
  }

  public login(username: string, password: string): Observable<any> {
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

  public register(username: string, password: string, name: string): Observable<any> {

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

  public recoverPassword(email: string): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.recoveryUrl, JSON.stringify({ email: email }), options)
                    .map((response: Response) => {
                        return response.json();
                      })
                      .catch((response: Response) => {
                        console.error(response);
                        throw response.json();
                      });
  }

  public resetPassword(token: string, newPassword: string): Observable<string> {
    var headers = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({ headers: headers });
    const params = {token: token, password: newPassword};

    return this.http.post('api/resetpass', params, options)
                    .map((response: Response) => {
                        return response.json();
                    })
  }

}
