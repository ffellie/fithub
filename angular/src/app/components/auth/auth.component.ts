import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { IRealUser, IStudent, Course } from 'src/app/models/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogged = false;

  public fname: string;
  public students: IStudent[] = [];
  public sname: string;
  public current_user: IRealUser;

  public current_student: IStudent;
  public current_studentid: number;
  public current_studentfname: string;
  public current_studentsname: string;


  protected studentcourses: Course[]=[];
  item1: IStudent;
  item2: IStudent;

  login = '';
  password = '';

  @Input() studentcourses2 = this.studentcourses;

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
    this.provider.getCurrentUser().then(res=>{
          this.current_user = res;
          this.fname = res.first_name;
          this.sname = res.last_name;
          this.determineEmployee(res.first_name, res.last_name);
          this.provider.getStudentCourses(this.item2.id);
          console.log(this.item2.id);

        });
  }

  determineEmployee(fname1: string, sname1: string){
    this.item1 = this.students.filter(function(item) {
      return item.fname = fname1
    })[0];
    this.item2 = this.students.filter(function(item) {
      return item.sname = sname1
    })[0];
    if(this.item1 == this.item2 && fname1 != '' && sname1 != ''){
      this.current_student = this.item2;
      console.log(this.item2.fname);
      this.current_studentid = this.current_student.id;
      this.current_studentfname = this.item1.fname;
      this.current_studentsname = this.item1.sname;
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
