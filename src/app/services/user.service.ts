import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { User } from '../models/user.model';
import { ProfileForm } from '../interfaces/profile-form.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  public auth2: any;
  public user!: User

  constructor( private http: HttpClient,
    private router: Router,
    private ngZone: NgZone ) {

    this.googleInit();
  }


  googleInit () {
    return new Promise<any>( ( resolve ) => {
      gapi.load( 'auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init( {
          client_id: '818722073066-hkam8m40erugf0i4dd9le33t3hfmvurj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        } );

        resolve( this.auth2 );
      } );
    } )

  }

  renewToken (): Observable<boolean> {

    return this.http.get( `${base_url}login/renew`, {
      headers: {
        'x-token': this.getToken
      }
    } ).pipe(
      map( ( resp: any ) => {
        const { name,
          email,
          role,
          google,
          image = '',
          uid } = resp.user;
        /** no se puede iguar user con resp.user porque se pierden las funciones del modelo en caso de tenerlas */
        this.user = new User( name, email, '', image, role, google, uid );

        localStorage.setItem( 'token', resp.token );
        return true;
      } )
      , catchError( error => of( false ) )
    );

  }

  get getToken (): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get getUid (): string {
    return this.user.uid || '';
  }

  createUser ( formData: RegisterForm ) {

    return this.http.post( `${base_url}users`, formData )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem( 'token', resp.token )
        } )
      );

  }

  updateUser ( profileData: ProfileForm ) {

    return this.http.put( `${base_url}users/${ this.getUid }`, profileData, {
      headers: {
        'x-token': this.getToken
      }
    } )
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