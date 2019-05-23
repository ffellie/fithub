import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { IRealUser, IStudent, Course, ITeacher } from 'src/app/models/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogged = false;

  public itstudent = true;

  public fname: string;
  public students: IStudent[] = [];
  public sname: string;
  public current_user: IRealUser;

  public current_student: IStudent;
  public current_studentid: number;
  public current_studentfname: string;
  public current_studentsname: string;

  public teachers: ITeacher[]=[];

  public current_teacher: ITeacher;
  public current_teacherid: number;
  public current_teacherfname: string;
  public current_teachersname: string;


  protected studentcourses: Course[]=[];
  item1: IStudent;
  item2: IStudent;
  item11: ITeacher;
  item22: ITeacher;

  login = '';
  password = '';


  constructor(private provider: ProviderService) { }

  ngOnInit() {
    
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.sendIfLogged();
    }
    this.provider.getStudents().then(res=>{
      this.students = res;
    });
    this.provider.getTeachers().then(res=>{
      this.teachers = res;
    });
    this.provider.getCurrentUser().then(res=>{
          this.current_user = res;
          this.fname = res.first_name;
          this.sname = res.last_name;
          this.determineEmployee(res.first_name, res.last_name);
          this.provider.getStudentCourses(this.item2.id);
          console.log(this.item2.id);
          this.sendIfLogged2();
        });
  }

  determineEmployee(fname1: string, sname1: string){
    this.item1 = this.students.filter( item =>
      item.fname = fname1)[0];
      this.item2 = this.students.filter( item =>
        item.sname = sname1)[0];
    if(this.item1 == this.item2 && fname1 != '' && sname1 != '' && this.item2 != null){
      this.current_student = this.item2;
      console.log(this.item2.fname);
      this.current_studentid = this.current_student.id;
      this.current_studentfname = this.item1.fname;
      this.current_studentsname = this.item1.sname;
    }
    else {
      this.itstudent = false;
    }


  }

  determineEmployee2(fname1: string, sname1: string){
    this.item11 = this.teachers.filter( item =>
      item.fname = fname1)[0];
      this.item22 = this.teachers.filter( item =>
        item.sname = sname1)[0];
    if(this.item11 == this.item22 && fname1 != '' && sname1 != '' && this.item22 != null){
      this.current_teacher = this.item22;
      console.log(this.item22.fname);
      this.current_teacherid = this.current_teacher.id;
      this.current_teacherfname = this.item11.fname;
      this.current_teachersname = this.item11.sname;
    }
    else {
      this.itstudent = true;
    }
  }


  StudentCourses(){
    return this.studentcourses;
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isLogged = true;
        this.sendIfLogged();
        
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.isLogged = false;
      localStorage.clear();
      this.sendIfLogged();
    });
  }

  sendIfLogged (){
    this.provider.sendIfLogged.emit(this.isLogged);
  }
  sendIfLogged2 (){
    this.provider.sendIfLogged2.emit(this.item2.id);
  }



}
