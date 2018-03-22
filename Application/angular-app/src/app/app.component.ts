import { Component } from '@angular/core';

import {UserService} from './services/user.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Http, Headers} from '@angular/http';

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

  searchquery = '';
  tweetsdata;

  constructor(private userService: UserService, private http: Http){}

  ngOnInit(){
    this.requesting = false;
  }

  disconnectUser(){
    this.requesting = true;
    this.userService.disconnectUser().subscribe((res)=>{
      this.requesting = false;
    })
  }

  makecall() {
    var headers = new Headers();
    
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    
    this.http.post('http://localhost:3000/authorize', {headers: headers}).subscribe((res) => {
      console.log(res);
    })
  }

  searchcall(){
    var headers = new Headers();
    var searchterm = 'query=' + this.searchquery;
    
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    
    this.http.post('http://localhost:3000/search', searchterm, {headers: headers}).subscribe((res) => {
      this.tweetsdata = res.json().data.statuses;
    });
  }
}
