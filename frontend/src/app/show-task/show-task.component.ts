import { Component, OnInit } from '@angular/core';
import {viewModel} from "../manager/manager.module";
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {MainService} from "../main.service";
import {FormBuilder,Validators} from '@angular/forms'
import {progressModel,completedModel} from '../user/user.module';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})

export class ShowTaskComponent implements OnInit {
  title:string= " ";
tasks= new viewModel(null,null,null,null);
completed =new completedModel(null,null,null,null,null,null); 
progreses=new progressModel(null,null,null,null,null,null);
rejected=new progressModel(null,null,null,null,null,null);
  constructor(private router: Router, private fb: FormBuilder, private mainService:MainService,public navCtrl: NgxNavigationWithDataComponent) {
    this.title= this.navCtrl.get('project').project;
   }

  ngOnInit(): void {
    this.mainService.getTasks(this.title).subscribe((date)=>{
      this.tasks=JSON.parse(JSON.stringify(date));
      // length = this.tasks.task.length;
      // console.log(length);
      console.log(this.tasks);
    })
    this.mainService.getProgress(this.title).subscribe((prog)=>{
      this.progreses=JSON.parse(JSON.stringify(prog));
      console.log(prog +"progress");
    });
    this.mainService.getCompleted(this.title).subscribe((complete)=>{
      this.completed=JSON.parse(JSON.stringify(complete));
      console.log(complete +"progress");
    });
    this.mainService.getRejected(this.title).subscribe((reject)=>{
      this.rejected=JSON.parse(JSON.stringify(reject));
      console.log(reject +"progress");
    });
  }
  deleteProduct(event){
    if (window.confirm("Do you want to delete?")){
    this.mainService.deleteProduct(event).subscribe((data) => {
    this.tasks = JSON.parse(JSON.stringify(data));})
    this.ngOnInit();
    alert('Deleted');
    }else{
      this.router.navigate(['/manager']);
    }
    
  }
  deleterejected(event){
    if (window.confirm("Do you want to delete?")){
    this.mainService.deleterejected(event).subscribe((data) => {
    this.tasks = JSON.parse(JSON.stringify(data));})
    this.ngOnInit();
    alert('Deleted');
    }else{
      this.router.navigate(['/manager/show']);
    }
    
  }
 
}
