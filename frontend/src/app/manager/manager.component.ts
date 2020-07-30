import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {MainService} from "../main.service";
import {FormBuilder,Validators} from '@angular/forms'

// import { FormGroup, FormControl, FormArray } from '@angular/forms'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnChanges {
 
  title:string= " ";
  name:string="";
  // length:string;
  
  constructor(private router: Router, private fb: FormBuilder, private mainService:MainService,public navCtrl: NgxNavigationWithDataComponent) {
    console.log(this.navCtrl.get('project'));
    this.title= this.navCtrl.get('project').project;
    this.name=this.navCtrl.get('project').name;
   }
   
  ngOnChanges():void{
   
  }
  ngOnInit(): void {
    
      
     
  }
  
}
