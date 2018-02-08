/**
 This file is used to define all request to user api
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
import { environment } from '../../environments/environment';
 
@Injectable()
export class UserService {
   constructor(private http: Http) { }
 
   getUsers() {
       return this.http.get(environment.api + '/user').map(res => res.json());
   }
 
   createUser(user) {
       return this.http.post(environment.api + '/user', user).map(res => res.json());
   }
 
   deleteUser(user) {
       return this.http.delete(environment.api + '/user/' + user.id);
   }

   updateUser(user){
       return this.http.put(environment.api + "/user/user", user).map(res => res.json());
   }
 
}