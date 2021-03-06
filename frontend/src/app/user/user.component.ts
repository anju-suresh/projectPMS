import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {statusModel} from './user.module';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {MainService} from "../main.service";
import {FormBuilder,Validators} from '@angular/forms';
import {viewModel} from "../manager/manager.module";
import {progressModel,completedModel} from './user.module';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title:string= " ";
  name:string="";
  titleHead= "Project Management System"
  progress =new statusModel(null,null,null,null,null,null);
  completed =new completedModel(null,null,null,null,null,null); 
  progreses=new progressModel(null,null,null,null,null,null);
  rejected=new progressModel(null,null,null,null,null,null);
  tasks= new viewModel(null,null,null,null);
  constructor(private router: Router, private fb: FormBuilder, private mainService:MainService,public navCtrl: NgxNavigationWithDataComponent) { 
    this.title= this.navCtrl.get('project').project;
    this.name=this.navCtrl.get('project').name;
  }

  ngOnInit(): void {

    this.mainService.getUserTasks(this.title,this.name).subscribe((date)=>{
      this.tasks=JSON.parse(JSON.stringify(date));
      // length = this.tasks.task.length;
      // console.log(length);
      console.log(this.tasks +'tasks');
     
    });
    this.mainService.getuserProgress(this.title,this.name).subscribe((prog)=>{
      this.progreses=JSON.parse(JSON.stringify(prog));
      console.log(prog +"progress");
    });
    this.mainService.getuserCompleted(this.title,this.name).subscribe((complete)=>{
      this.completed=JSON.parse(JSON.stringify(complete));
      console.log(complete +"progress");
    });
    this.mainService.getuserRejected(this.title,this.name).subscribe((reject)=>{
      this.rejected=JSON.parse(JSON.stringify(reject));
      console.log(reject +"progress");
    });
    
   
    
  }
  onChange(isChecked: boolean,id) {
    if (isChecked) {
      this.progress.status="Accepted";
    } 
    this.mainService.addProgress(id,this.progress)
    console.log(this.progress)
    console.log("called");
    this.mainService.getuserProgress(this.title,this.name).subscribe((prog)=>{
      this.progreses=JSON.parse(JSON.stringify(prog));
      console.log(prog +"progress");
    });
    this.ngOnInit();
    alert('Task Accepted');
  }
  onReject(isChecked: boolean,id) {
    if (isChecked) {
      this.progress.status="Rejected";
    } 
    this.mainService.addProgress(id,this.progress)
    console.log(this.progress)
    console.log("called");
    this.mainService.getuserRejected(this.title,this.name).subscribe((reject)=>{
      this.rejected=JSON.parse(JSON.stringify(reject));
      console.log(reject +"progress");
    });
    this.ngOnInit();
    alert('Task Rejected');
  }
  onCompleted(isChecked: boolean,id) {
    console.log(id);
    if (isChecked) {
      this.completed.completed="Completed";
    } 
    this.mainService.addCompleted(id,this.completed.completed)
    console.log(this.completed)
    console.log("called");
    this.mainService.getuserCompleted(this.title,this.name).subscribe((complete)=>{
      this.completed=JSON.parse(JSON.stringify(complete));
      console.log(complete +"progress");
    });
    this.ngOnInit();
    alert('Task Completed');
  }
}
