import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }
  addProject(item){
    console.log(item);
    return this.http.post("http://localhost:3000/admin/add",{"user":item})
    .subscribe(data =>{console.log(data)})
  }
  addProjectDetails(item){
    console.log(item);
    return this.http.post("http://localhost:3000/admin/addProject",{"project":item})
    
  }
  getemployees(project){
    return this.http.post("http://localhost:3000/admin/getemployee",{"project":project});
  }
  getUsers(project){
    return this.http.get("http://localhost:3000/admin/getUsers/" + project);
  }
  addTask(item){
    console.log(item);
    return this.http.post("http://localhost:3000/admin/addTask", {"task":item})
    .subscribe(data =>{console.log(data)})
  }
  getTasks(project){
    return this.http.get("http://localhost:3000/admin/gettasks/" + project);
  }
  addProgress(id,item){
    console.log(item);
    return this.http.post("http://localhost:3000/user/addprogress",{"id":id,"progress":item})
    .subscribe(data =>{console.log(data)})
  }

  getProgress(item){
    return this.http.get("http://localhost:3000/user/getProgress/" + item);
  }

  addCompleted(id,item){
    console.log(item);
    console.log(id);
    return this.http.post("http://localhost:3000/user/addCompleted",{"id":id,"status":item})
    .subscribe(data =>{console.log(data)})
  }
  getRejected(item){
    return this.http.get("http://localhost:3000/user/getRejected/" + item);
  }
  getCompleted(item){
    return this.http.get("http://localhost:3000/user/getCompleted/" + item);
  }
  deleteProduct(pid){
    console.log(pid)
    return this.http.get("http://localhost:3000/admin/delete/"+pid)

  }
  update(pid){
    return this.http.post("http://localhost:3000/admin/update",{"task":pid})
    .subscribe(data => {console.log("updateservice"+data)})
}
  
updateProduct(pid){
  console.log(pid)
  return this.http.get("http://localhost:3000/admin/update/"+pid)
 
}
deleterejected(pid){
  console.log(pid)
  return this.http.get("http://localhost:3000/admin/deleterejected/"+pid)

}
}
