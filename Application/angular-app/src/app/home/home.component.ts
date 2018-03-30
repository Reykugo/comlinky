import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	title = 'home';
	newUser = {}; //to store values of create form
	users: Array<any>; //Store all users 
	requesting : boolean; //Use to check if a request is actally in process

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.requesting = false;
  	this.getUsers();
  }

  ngOnChange(){
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
