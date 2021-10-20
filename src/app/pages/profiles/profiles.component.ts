import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styles: []
} )
export class ProfilesComponent implements OnInit {

  public profileForm!: FormGroup;
  public user: User;
  public imageUp!: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
    private userServices: UserService,
    private fileUploadService: FileUploadService ) {
    this.user = this.userServices.user;
  }

  ngOnInit (): void {
    this.profileForm = this.fb.group( {
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    } );
  }

  updateProfile () {
    this.userServices.updateUser( this.profileForm.value )
      .subscribe( resp => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;

        Swal.fire( 'Ok', "Profile has beean updated", 'success' );
      }, ( err ) => {
        Swal.fire( 'Error', err.error.msg, 'error' );
      } )

  }

  changeImage ( file: any ) {

    if ( !file?.target?.files[0] ) {
      this.imgTemp = null;
    }

    if ( file?.target?.files[0] ) {
      this.imageUp = file?.target?.files[0];

      const reader = new FileReader();
      reader.readAsDataURL( file?.target?.files[0] );

      reader.onloadend = () => {
        this.imgTemp = reader.result
      }
    }

  }

  upLoadImage () {
    this.fileUploadService
      .updatePhoto( this.imageUp, 'users', this.user.uid || '' )
      .then( img => {
        this.user.image = img;
        Swal.fire( 'Ok', "Image updated", 'success' );
      } ).catch(err => {
        Swal.fire( 'Error', 'It cannot upload image', 'error' );
      });
  }
}