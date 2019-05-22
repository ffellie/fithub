import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';
import { ProviderService } from 'src/app/services/provider.service';
import { AuthComponent } from '../auth/auth.component';
import { resolve } from 'dns';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  public courses: Course[] = [];
  name = '';
  student = true;
  description = '';
  public remembercoursename: Course;
  course = { name : this.name, description: this.description };
 
  studentcourses: Course[]=[];
  studentcoursesid: number;
  isLogged = false;
  ifEditing = false;
  edited: Course= {id: -1, name: "ads", description: 'asd'};


  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }
    this.getCourses();
    this.provider.sendIfLogged2.subscribe(
      res=>{
        this.studentcoursesid = res;
        console.log(res);
        console.log(res);
        this.provider.getStudentCourses(res).then(res=>{
          this.studentcourses = res;
        });
      }
    );
    this.provider.sendIfLogged.subscribe(res => {
      this.isLogged = res;
      if (this.isLogged) {
        this.getCourses();
      }
    });
    
  }

  getCourses = () => {
    this.provider.sendIfLogged2.subscribe(
      res=>{
        this.studentcoursesid = res;
        console.log(res);
        console.log(res);
        this.provider.getStudentCourses(res).then(res=>{
          this.studentcourses = res;
        });
      }
    )
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
    this.provider.createCourse(this.name, this.description).subscribe(
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
