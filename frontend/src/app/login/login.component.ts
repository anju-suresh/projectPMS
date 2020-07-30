import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Router } from '@angular/router';
import {authUserModel,projectModel} from "./login.module";
import {adminModel} from "../admin/admin.module"
import {AuthService} from "../auth.service";
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:string="Log In";
  constructor(private router: Router, private fb: FormBuilder, private authService:AuthService,public navCtrl: NgxNavigationWithDataComponent) { }
  users= new authUserModel(null,null,null)
  user=new adminModel(null,null,null,null);
  project = new projectModel(null);
  projectname=[];
  ngOnInit(): void {
    this.authService.getproject().subscribe((prog)=>{
      let projects=JSON.parse(JSON.stringify(prog));
      for(let i=0;i< projects.length;i++){
        this.projectname[i]=projects[i].project;
        console.log(this.projectname[i])

      }
      
    });
  }

  changeteam(event:any) {
    
    console.log(event.target.value);
    this.users.project=event.target.value;
  }
  loginForm = this.fb.group({
    projectName:[''],
    email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })

  userlogin(){
    
    this.authService.authUser(this.users)
    .subscribe(
      res=> {
        console.log(res);
          if(res==='Invalid Password' || res === 'Invalid Email'){
            alert('Invalid Credentionals');
           
          }else {

            
            // if(this.user==null){
            //   alert("You are not assigned in this Project");
            // }else{
              try {
                this.user=JSON.parse(JSON.stringify(res));
              console.log(this.user);
              if(this.user.name=="admin"){
                  this.router.navigate(['/admin']);
              }
              else if(this.user.role =="manager"){
                this.navCtrl.navigate('manager', {project: this.user});
                // this.router.navigate(['/manager']);
              }else if(this.user.role =="employee"){
                this.navCtrl.navigate('user', {project: this.user});
                // this.router.navigate(['/manager']);
              }
              } catch (error) {
                alert("You are not assigned in this Project");
              }
              
            // }
           
            
          }
        },
      err=>{
          console.log(err);
        }

      )
    console.log(this.users);
  }
}
