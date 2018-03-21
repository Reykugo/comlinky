import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	title = 'profile';
	newUser = {}; //to store values of create form
	users: Array<any>; //Store all users 
	requesting : boolean; //Use to check if a request is actally in process

	constructor(private userService: UserService){}

	ngOnInit(){
		this.requesting = false;
	}
}
