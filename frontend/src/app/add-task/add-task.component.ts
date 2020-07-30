import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {taskModel} from "../add-task/add-task.module";
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {MainService} from "../main.service";
import {FormBuilder,Validators} from '@angular/forms'
import {adminModel} from '../admin/admin.module'
import {NgForm} from '@angular/forms';
import { from } from 'rxjs';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title:string= "Assign Task";
   project:string = "";
   employees=new adminModel(null,null,null,null);
   
  constructor(public navCtrl: NgxNavigationWithDataComponent,private router: Router, private fb: FormBuilder, private mainService:MainService) {
   this.project= this.navCtrl.get('project').project;
   }
   empname=[];
  ngOnInit(): void {
    this.mainService.getemployees(this.project).subscribe((prog)=>{
      let emp=JSON.parse(JSON.stringify(prog));
      for(let i=0;i< emp.length;i++){
        this.empname[i]=emp[i].name;
        console.log(this.empname[i])

      }
      
    });
  }
  
  taskForm = this.fb.group({
      
      task:['',[Validators.required]],
      teammate:[''],
      date:['',[Validators.required]]
    })
  
    tasks= new taskModel(null,null,null,null);
 
  changeteam(event:any) {
    
    console.log(event.target.value);
    this.tasks.teammate=event.target.value;
  }
    addTask(){
      this.tasks.project = this.project;
      // this.tasks.teammate=this.member;
      //  this.tasks.teammate =JSON.stringify(this.taskForm.value)

      this.mainService.addTask(this.tasks);
      console.log(this.tasks);
      
      alert('Task added Successfully');
      
      this.router.navigate(['/manager']);
    }
    Clear(){
      this.router.navigate(['/manager']);
    }

}
