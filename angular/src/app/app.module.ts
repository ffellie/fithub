import { BrowserModule } from '@angular/platform-browser';
import { ClassProvider,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { InfoComponent } from './components/info/info.component';
import { AuthComponent } from './components/auth/auth.component';
import { ClassComponent } from './components/class/class.component';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProviderService } from 'src/app/services/provider.service';
import {AuthInterceptor} from './AuthInterceptor';
import { CourseComponent } from './components/course/course.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    InfoComponent,
    AuthComponent,
    ClassComponent,
    CourseComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProviderService,
    <ClassProvider> {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
