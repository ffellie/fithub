import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ILesson, Course } from 'src/app/models/models';

@Component({
  selector: 'app-schedule1',
  templateUrl: './schedule1.component.html',
  styleUrls: ['./schedule1.component.css']
})
export class Schedule1Component implements OnInit {

  public slessons: ILesson[]=[];
  public tlessons: ILesson[]=[];
  public courses: Course[]=[];
  public studentid: number;
  public courses2: Course[]=[];
  public item111: Course;
  public notlist = true;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.sendIfLogged2.subscribe(
      res=>{
        this.studentid = res;
        console.log(res);
        this.provider.getStudentLessons(this.studentid, 0).then(res1=>{
          console.log(res1);
          this.slessons = res1;
        });
        this.provider.getStudentCourses(this.studentid).then(res2=>{
          this.courses = res2;
        });
        this.provider.getAllCourses2().then(res3=>{
          this.courses2 = res3;
        })
      }
    );  }

    showCourses(course: Course){
      this.provider.getCourseLessons(course.id).then(res=>{
        this.tlessons = res;
      });
    }

    changeListing(){
      if(this.notlist)
      this.notlist = false;
      else if(!this.notlist)
      this.notlist = true;
    }

    getSutff(course: string){
      console.log(this.courses2);
      this.item111 = this.courses2.filter(x=> x.name == course)[0];
      console.log(this.courses2);
      console.log(this.courses)
      console.log(this.item111.id);
      console.log(this.item111.name);
      console.log(this.item111);
      this.showCourses(this.item111);
      }
    }


