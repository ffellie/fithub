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

  course = { name : this.name, description: this.description };
 
  isLogged = false;

  login = '';
  password = '';

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

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isLogged = true;
        this.getCourses();
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.isLogged = false;
      localStorage.clear();
    });
  }


}
