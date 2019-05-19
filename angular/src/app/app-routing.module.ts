import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { InfoComponent } from './components/info/info.component';
import { NewsComponent } from './components/news/news.component';
import { ClassComponent } from './components/class/class.component';
import { CourseComponent } from './components/course/course.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'info', component: InfoComponent},
  { path: 'news', component: NewsComponent},
  { path: 'class', component: ClassComponent},
  { path: 'course', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
