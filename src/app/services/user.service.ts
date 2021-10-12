import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators'

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  public auth2: any;

  constructor( private http: HttpClient,
    private router: Router,
    private ngZone: NgZone ) {

    this.googleInit();
  }


  googleInit () {
    return new Promise<any>( (resolve) => {
      gapi.load( 'auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init( {
          client_id: '818722073066-hkam8m40erugf0i4dd9le33t3hfmvurj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        } );

        resolve(this.auth2);
      } );
    } )

  }

  renewToken (): Observable<boolean> {
    const token = localStorage.getItem( 'token' ) || '';

    return this.http.get( `${base_url}login/renew`, {
      headers: {
        'x-token': token
      }
    } ).pipe(
      tap( ( resp: any ) => {
        localStorage.setItem( 'token', resp.token );
      } ),
      map( resp => true )
      , catchError( error => of( false ) )
    );

  }

  createUser ( formData: RegisterForm ) {

    return this.http.post( `${base_url}users`, formData )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem( 'token', resp.token )
        } )
      );

  }

  login ( formData: LoginForm ) {

    return this.http.post( `${base_url}login`, formData )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem( 'token', resp.token )
        } )
      );

  }

  loginGoogle ( token: any ) {

    return this.http.post( `${base_url}login/google`, { token } )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem( 'token', resp.token )
        } )
      );

  }

  logout () {
    localStorage.removeItem( 'token' );

    this.auth2.signOut()
      .then( () => {

        this.ngZone.run( () => {
          this.router.navigateByUrl( '/auth' );
        } )

      } );
  }
}