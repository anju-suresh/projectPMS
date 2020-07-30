import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterModel} from "../sign-up/sign-up.module"
import {AuthService} from "../auth.service";
import {FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  title:string="Sign Up";
  constructor(private router: Router, private fb: FormBuilder, private authService:AuthService) { }
  registerForm = this.fb.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })
  user= new RegisterModel(null,null,null)
  ngOnInit(): void {
  }

  
  registerUser(){
    
    this.authService.newUser(this.user);
    console.log(this.user);
    alert('Registered Successfully');
    this.router.navigate(['/login']);
  }
 

}
