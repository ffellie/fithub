import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogged = false;

  login = '';
  password = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.sendIfLogged();

    }
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
}
