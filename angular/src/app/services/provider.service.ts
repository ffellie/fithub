
import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course, IAuthResponse, IRealUser, IStudent, IRoom, IRoomPaginated, ILesson, ITeacher} from 'src/app/models/models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  public sendMessage = new EventEmitter<Course>();
  
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})

  constructor(http: HttpClient) {
    super(http);
  }

  getCourses(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/courses/',
    {headers: this.httpHeaders});
  }

  getAllCourses(): Observable<any> {
    return this.http.get('http://localhost:8000/api/allcourses/', {
      headers: this.httpHeaders
    });
  }


  
  getAllCourses2(): Promise<Course[]> {
    return this.get('http://localhost:8000/api/allcourses/', {});
  }

  updateRoom(id: number, number: number, iadm: boolean, postfix: string, iocc: boolean): Promise<IRoom> {
    return this.put('http://localhost:8000/api/rooms/' + id + '/', {
      number: number,
      isadministrative: iadm,
      postfix: postfix,
      isoccupied: iocc
    });
  }
  
  getCourses2(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/studentcourses/' + id,
    {headers: this.httpHeaders});
  }
  createCourse2(id:number, name: string, desc: string): Promise<Course> {
    return this.post('http://127.0.0.1:8000/api/studentcourses/' + id + '/', {
      name: name,
      description: desc,
      subjects: id
    });
  }
  deleteCourse2(id:number, id1:number): Promise<any> {
    return this.delet('http://127.0.0.1:8000/api/studentcourses/' + id + '/course/' + id1 + '/', {});
  }

  updateCourse(course): Observable<any> {
    const body = { name: course.name , description: course.description};
    return this.http.put('http://127.0.0.1:8000/api/courses/' + course.id + '/', body,
    {headers: this.httpHeaders});
  }

  createCourse(name: string, desc: string): Observable<any> {
    const body = { name: name , description: desc};
    return this.http.post('http://127.0.0.1:8000/api/courses/', body,
    {headers: this.httpHeaders});
  }
  deleteCourse(id): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/courses/' + id + '/',
    {headers: this.httpHeaders});
  }
  
  auth(login: string, password: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  getCurrentUser(): Promise<IRealUser>{
    return this.get('http://localhost:8000/api/users/0/', {
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

  public sendIfLogged = new EventEmitter<boolean>();
  public sendIfLogged2 = new EventEmitter<number>();

  getNews(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/news/',
    {headers: this.httpHeaders});
  }

  getStudents(): Promise<IStudent[]> {
    return this.get('http://localhost:8000/api/students/', {});
  }

  
  getTeachers(): Promise<ITeacher[]> {
    return this.get('http://localhost:8000/api/teachers/', {});
  }

  getStudentCourses(pk: number): Promise<Course[]>{
    return this.get('http://localhost:8000/api/studentcourses/' + pk + '/',{})
  }

  getRooms(): Promise<IRoom[]> {
    return this.get('http://localhost:8000/api/roomspag/', {})
  }
  
  getTeacherLessons(): Promise<ILesson[]> {
    return this.get('http://localhost:8000/api/teacherlessons/', {})
  }

  getStudentLessons(pk1: number, pk2: number): Promise<ILesson[]> {
    return this.get('http://localhost:8000/api/studentlessons/' + pk1 + '/', {})
  }

  getCourseLessons(pk1: number): Promise<ILesson[]>{
    return this.get('http://localhost:8000/api/teacherlessons/' + pk1+'/', {});
  }

  getOccupiedRooms(str:string, offset: number): Promise<IRoomPaginated> {
    return this.get('http://localhost:8000/api/roomspag/?isoccupied=' + str + '&' + '?limit=5&offset=' + offset, {})
  }

  getSearchByNumber(number: number, offset: number): Promise<IRoomPaginated> {
    return this.get('http://localhost:8000/api/roomspag/?number=' + number + '&' + '?limit=5&offset=' + offset, {});
  }
  
  getAdmRooms(str:string, offset: number): Promise<IRoomPaginated> {
    return this.get('http://localhost:8000/api/roomspag/?isadministrative=' + str + '&' + '?limit=5&offset=' + offset, {})
  }

  
  getAdmOccRooms(str:string, str2: string, offset: number): Promise<IRoomPaginated> {
    return this.get('http://localhost:8000/api/roomspag/?isadministrative=' + str + '&isoccupied=' + str2 + '&?limit=5&offset=' + offset, {})
  }

  getRoomsPag(int: number): Promise<IRoomPaginated> {
    return this.get('http://localhost:8000/api/roomspag/?limit=5&offset=' + int,{});
  }
  // getCourseForCourse(lol: Course): Observable<any> {
  //   return this.http.get('http://127.0.0.1:8000/api/courses/'+ lol.id + '/',
  //   {headers: this.httpHeaders});
  // }


}
