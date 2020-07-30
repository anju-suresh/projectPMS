import { Component, OnInit } from '@angular/core';
// For MDB Angular Free


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
 title= "Project Management System"
  constructor() { }

  ngOnInit(): void {
  }

}
