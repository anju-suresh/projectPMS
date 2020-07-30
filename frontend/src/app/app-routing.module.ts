import { NgModule } from '@angular/core';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';


import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AdminComponent} from './admin/admin.component';
import {ManagerComponent} from './manager/manager.component';
import {ShowTaskComponent} from './show-task/show-task.component';
  import { from } from 'rxjs';
import { AddTaskComponent } from './add-task/add-task.component';

import {UserComponent} from './user/user.component';
import {UpdateTaskComponent} from './update-task/update-task.component';
import {HomePageComponent} from './home-page/home-page.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'admin',component:AdminComponent},
  {path:'manager',component:ManagerComponent,children:[
  {path:'add',component:AddTaskComponent},
  {path:'show',component:ShowTaskComponent,children:[
    {path:'update/:pid',component:UpdateTaskComponent}
  ]},
  ]},
  {path:'user',component:UserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
