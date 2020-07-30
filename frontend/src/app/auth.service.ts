import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  authUser(users){
    console.log(users)
    return this.http.post("http://localhost:3000/auth/authuser",{"users":users})
  }
  newUser(user){
    console.log(user)
    return this.http.post("http://localhost:3000/auth/adduser",{"user":user})
    .subscribe(data => {console.log("userservice"+data)})
  }
  getproject(){
    return this.http.get("http://localhost:3000/auth/getproject");
  }
}
