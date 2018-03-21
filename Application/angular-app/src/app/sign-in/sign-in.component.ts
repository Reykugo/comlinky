import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  title = 'signIn';
  newUser = {}; //to store values of create form
  users: Array<any>; //Store all users 
  requesting : boolean; //Use to check if a request is actally in process

  constructor(private userService: UserService){}

  ngOnInit(){
    this.requesting = false;
  }

  connectUser(){
    this.requesting = true;
    this.userService.connectUser(this.newUser).subscribe((res)=>{
      this.newUser = {};
      this.requesting = false;
    })
  }
}
