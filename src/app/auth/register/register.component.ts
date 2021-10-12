import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
} )
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group( {
    name: ['steven', Validators.required],
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    password2: ['123', Validators.required],
    term: [true, Validators.required],
  },
    {
      validators: this.passEqual( 'password', 'password2' )
    } );

  constructor( private fb: FormBuilder,
    private userService: UserService,
    private router: Router ) { }

  createUser () {
    this.formSubmitted = true;
    //import * as swal from 'sweetalert';
    if ( this.registerForm.invalid ) {
      return;
    }

    this.userService.createUser( this.registerForm.value )
      .subscribe( resp => {
        this.router.navigateByUrl( '/dashboard' );
      },
        ( err ) => {
          Swal.fire( 'Error', err.error.msg, 'error' )
        } );
  }

  invalidField ( field: string ): boolean {

    if ( this.registerForm.get( field )!.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false
    }
  }

  acceptTerm () {
    return !this.registerForm.get( 'term' )?.value && this.formSubmitted;
  }

  validPassword () {
    const pass1 = this.registerForm.get( 'password' )?.value;
    const pass2 = this.registerForm.get( 'password2' )?.value;

    if ( pass1 !== pass2 && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  passEqual ( pass1: string, pass2: string ) {

    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get( pass1 );
      const pass2Control = formGroup.get( pass2 );

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors( null );
      } else {
        pass2Control?.setErrors( { notIsEqual: true } );
      }
    }
  }

}
