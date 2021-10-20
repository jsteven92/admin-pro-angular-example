import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
} )
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: User[] = [];
  public from: number = 0;
  public loanding: boolean = true;

  constructor( public userService: UserService,
    private searchService: SearchesService ) { }

  ngOnInit (): void {
    this.loadUsers();
  }

  changePage ( newfrom: number ) {
    this.from += newfrom;
    if ( this.from < 0 ) {
      this.from = 0;
    } else if ( this.from > this.totalUsers ) {
      this.from -= newfrom;
    }

    this.loadUsers();
  }

  loadUsers () {
    this.loanding = true;
    this.userService.loadUser( this.from )
      .subscribe( ( { totalUsers, users } ) => {
        this.totalUsers = totalUsers;
        this.users = users;
        this.loanding = false;
      } )
  }

  search ( token: string ) {

    if ( token.length === 0 ){
      this.loadUsers();
      return 
    }

    this.searchService.search( 'users', token )
      .subscribe( res => {

        this.users = res;

      }
      )
  }

  deleteUser( user: User){

    if(this.userService.getUid === user.uid){
      Swal.fire(
        'Error',"You can't delele your user",
        'error'
      );
      return
    }
    Swal.fire({
      title: 'Are you sure',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.value) {
        this.userService.deleteUser( user )
        .subscribe(res => {
          this.loadUsers();
          Swal.fire(
            'deleted','User has been deleted',
            'success'
          );
        }
        );
       
      }
    });

    
  }

  changeRole(user: User){
   //this.userService.updateUser( user )
    
  }

}
