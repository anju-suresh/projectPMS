import { Component, OnInit } from '@angular/core';
import {viewModel} from "../manager/manager.module";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {MainService} from "../main.service";
import { ActivatedRoute } from '@angular/router';
import {FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskItem= new viewModel(null,null,null,null);
  pid="";
  constructor(public datepipe: DatePipe,private router: Router, private fb: FormBuilder,private _route:ActivatedRoute, private mainService:MainService,public navCtrl: NgxNavigationWithDataComponent) { }
  taskForm = this.fb.group({
      
    task:['',[Validators.required]],
    teammate:[''],
    date:['',[Validators.required]]
  })
  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.pid = params['pid']
    });
    console.log("id"+ this.pid);
    this.mainService.updateProduct(this.pid).subscribe((data)=>{
      this.taskItem=JSON.parse(JSON.stringify(data));
      // this.taskItem.date=new Date();
      this.taskItem.date =this.datepipe.transform(this.taskItem.date, 'yyyy-MM-dd');
      // this.datepipe.transform(this.taskItem.date, 'dd/MM/yyyy')
    });
  }
  update(){
    if (window.confirm("Do you want to update this product?")){
    this.mainService.update(this.taskItem);
    console.log(this.taskItem)
    console.log("called");
    alert('Updated Successfuly');
    this.router.navigate(['/manager']);
    }else{
      this.router.navigate(['/manager']);
    }
  }
  Clear(){
    this.router.navigate(['/manager/show']);
  }
}
