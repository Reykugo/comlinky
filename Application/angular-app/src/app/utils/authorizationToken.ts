import jwtDecode from 'jwt-decode';
import {Headers} from '@angular/http';

export function setAuthorizationToken(token){
    if(token){
        localStorage.setItem('jwtToken', token);
    }
}

export function getAuthorizationToken(){
    if (localStorage.jwtToken){
        return localStorage.jwtToken;
    }else{
        return null;
    }
}

export function getAuthorizationTokenHeader(){
    let headers = new Headers();
    headers.append('x-access-token', getAuthorizationToken());
    return headers;
}


export function decodeAuthorizationToken(token){
    if(token){
        return jwtDecode(token)
    }
    
}