import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: [
  ]
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promise = new Promise((resolve, reject) => {
      if (false) {
        /** you can use anything but resolve is a convection */
        resolve("hello word");
      } else {
        /** you can use anything but reject is a convection */
        reject('wrong');
      }
    });

    promise
      .then((message) => {
        console.log(` it finish ${message}`);
      })
      .catch((error => {
        console.log(`error promise ${error}`);
      }));

    console.log("end Init");

    /**this is the best way of promise */
    this.getUsers().then(users => {
      console.log()
    });
  }

  getUsers() {
    return new Promise(resolve => {

      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(body => {
          resolve(body.data);
        });
    });
  }

}
