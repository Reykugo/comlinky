import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  title = 'signUp';
  newUser = {}; //to store values of create form
/*  users: Array<any>; //Store all users 
*/  requesting : boolean; //Use to check if a request is actally in process

  constructor(private userService: UserService){}

  ngOnInit(){
    this.requesting = false;
  }

  createUser(){
    this.requesting = true;
    this.userService.createUser(this.newUser).subscribe((res) =>{
/*      this.users.push(res);
*/      this.newUser = {};
      this.requesting = false;
    })
  }
}
