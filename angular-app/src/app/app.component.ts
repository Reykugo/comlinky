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
  users: Array<any>;
  requesting : boolean;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.requesting = false;
    this.getUsers();
  }

  getUsers(){
    this.requesting = true;
    this.userService.getUsers().subscribe((res) =>{
      this.users = res.users;
      this.requesting = false
    }, (err) =>{
      this.requesting = false;
    })
  }
}
