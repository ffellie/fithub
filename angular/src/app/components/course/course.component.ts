import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  message: Course; 
  
  
  constructor(private provider: ProviderService) {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.isLogged = true;
    // }
    // this.getCourses();

  }

  ngOnInit() {
    this.provider.sendMessage.subscribe(res => {
      this.message = res;
    });
  }

  

}

