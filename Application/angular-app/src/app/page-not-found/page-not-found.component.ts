import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
	title = 'pageNotFound';
	newUser = {}; //to store values of create form
	users: Array<any>; //Store all users 
	requesting : boolean; //Use to check if a request is actally in process

	constructor(private userService: UserService){}

	ngOnInit(){
		this.requesting = false;
	}
}
