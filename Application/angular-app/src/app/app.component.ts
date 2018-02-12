import { Component } from '@angular/core';

import {UserService} from './services/user.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  newUser = {}; //to store values of create form
  users: Array<any>; //Store all users 
  requesting : boolean; //Use to check if a request is actally in process

  constructor(private userService: UserService){}

  ngOnInit(){
    this.requesting = false;
    this.getUsers();
  }

  //et all users profile in database
  getUsers(){
    this.requesting = true;
    this.userService.getUsers().subscribe((res) =>{
      this.users = res.users;
      this.requesting = false
    }, (err) =>{
      this.requesting = false;
    })
  }

  createUser(){
    this.requesting = true;
    this.userService.createUser(this.newUser).subscribe((res) =>{
      this.users.push(res);
      this.newUser = {};
      this.requesting = false;
    })
  }

  deleteUser(user){
    this.requesting = true;
    this.userService.deleteUser(user).subscribe(() =>{
      this.users.forEach((u, i) =>{
        if(u.id == user.id){
          this.users.splice(i, 1);
        }
      });
      this.requesting = false;
    })
  }
}
