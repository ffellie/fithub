import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  public courses: Course[] = [];
  name = '';
  description = '';
  public remembercoursename: Course;
  course = { name : this.name, description: this.description };
 
  isLogged = false;
  ifEditing = false;
  edited: Course= {id: -1, name: "ads", description: 'asd'};


  constructor(private provider: ProviderService) {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.isLogged = true;
    // }
    // this.getCourses();

  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }
    this.getCourses();
    this.provider.sendIfLogged.subscribe(res => {
      this.isLogged = res;
      if (this.isLogged) {
        this.getCourses();
      }
    });
    
  }

  getCourses = () => {
      this.provider.getCourses().subscribe(
        data => {
          this.courses = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  createCourse = () => {
    this.course = { name : this.name, description: this.description };

    this.provider.createCourse(this.course).subscribe(
      data => {
        this.getCourses();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCourse = (c: Course) => {
    this.provider.deleteCourse(c.id).subscribe(
      data => {
        this.getCourses();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCourse = (c: Course) => {
    this.provider.updateCourse(c).subscribe(
      data => {
        this.getCourses();
      },
      error => {
        console.log(error);
      }
    );
  }

  edit(c: Course) {
    this.edited=c;
    this.ifEditing = true;

  }
  rememberCourseMethod(name: Course) {
    this.remembercoursename=name;
  }
  
  sendMessageByService() {
    this.provider.sendMessage.emit(this.remembercoursename);
  }


}
