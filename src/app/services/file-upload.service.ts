import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable( {
  providedIn: 'root'
} )
export class FileUploadService {

  constructor() { }

  async updatePhoto (
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${base_url}upload/${type}/${id}`;
      const formData = new FormData();

      formData.append( 'file', file );
      const resp: Response = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem( 'token' ) || ''
        },
        body: formData
      } );

      console.log( resp );
      const data = await resp.json();

      console.log( data );
      if ( data.ok ) {
        return data.name;
      } else {
        return false;
      }

    } catch ( error ) {
      console.log( error )
      return false;
    }
  }
}
