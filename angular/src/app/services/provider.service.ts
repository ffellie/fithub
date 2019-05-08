
import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course, IAuthResponse} from 'src/app/models/models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})

  constructor(http: HttpClient) {
    super(http);
  }

  getCourses(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/courses/',
    {headers: this.httpHeaders});
  }

  updateCourse(course): Observable<any> {
    const body = { name: course.name , description: course.description};
    return this.http.put('http://127.0.0.1:8000/api/courses/' + course.id + '/', body,
    {headers: this.httpHeaders});
  }

  createCourse(course): Observable<any> {
    const body = { name: course.name , description: course.description};
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

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }


}
