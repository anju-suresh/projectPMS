import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import {MainService} from "../main.service";
import {adminModel} from "../admin/admin.module";
import {projectModel} from "../admin/admin.module";
import { userModel } from '../admin/admin.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title:string="Add Avialble Projects";
  constructor(private router: Router, private fb: FormBuilder, private mainService:MainService) { }
  project= new adminModel(null,null,"employee",null);
  users=new userModel(null,null,null);
  projectName = new projectModel(null,null);
  ngOnInit(): void {
  }
  onChange(isChecked: boolean) {

    if (isChecked) {
      this.project.role="manager";
    } else {
      this.project.role="employee";
    }
  }
  adminForm = this.fb.group({
    project:['',[Validators.required]],
    description:[''],
    name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    role:[''],
    email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
  })
  addProject(){
    // if (isChecked) {
    //   this.project.role="manager";
    // } else {
    //   this.project.role="employee";
    // }
    this.mainService.addProject(this.project)
    console.log(this.project)
    console.log("called");
    alert('Success');
    
  }
  addProjName(){
    this.mainService.addProjectDetails(this.projectName)
    .subscribe(
      res=> {
        if(res="Already Exist"){
          console.log(this.projectName.project);
          this.mainService.getUsers(this.projectName.project).subscribe((date)=>{
            this.users=JSON.parse(JSON.stringify(date)); 
          })
          alert('Already Exists Project, Now you can add more Team Members if you need!')
        }else{
          console.log(this.projectName)
          console.log("called");
          console.log(this.projectName.project);
          this.mainService.getUsers(this.projectName.project).subscribe((date)=>{
            this.users=JSON.parse(JSON.stringify(date)); 
            alert('Project Added Succefully, Now you can add Team Members!');
          })
        }
      }
    )
    

  }
}
