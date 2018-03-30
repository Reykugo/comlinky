import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {setAuthorizationToken} from '../utils/authorizationToken';
import {Router} from '@angular/router';

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

  constructor(private userService: UserService, private router:Router){}

  ngOnInit(){
    this.requesting = false;
  }

  connectUser(){
    this.requesting = true;
    this.userService.connectUser(this.newUser).subscribe((res)=>{
      if (res.token){
        setAuthorizationToken(res.token)
      }
      this.router.navigate(['/home']);
      this.newUser = {};
      this.requesting = false;
    })
  }
}
