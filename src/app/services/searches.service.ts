import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private http:HttpClient) { }

  get getToken (): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get headers () {
    return {
      headers: {
        'x-token': this.getToken
      }
    }
  }

  private transformUsers(resul: any[]): User[] {

    return resul.map(
      user => new User(user.name,user.email,'',user.image,user.role,user.google,user.uid
      ) );
  }

  search ( type: 'users'|'hospitals'|'doctors',
           token : string) {
    const url = `${ base_url }searchs/${ token }`;

    return this.http.get<any[]>( url, this.headers )
      .pipe(
        map( (res: any) =>  {
          switch ( type ) {
            case 'users':
              return this.transformUsers( res.users );
              break;
          
            default:
              return []
              break;
          }
        })
      )
  }

}
