import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ILesson } from 'src/app/models/models';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public slessons: ILesson[]=[];
  public tlessons: ILesson[]=[];
  public studentid: number;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.sendIfLogged2.subscribe(
      res=>{
        this.studentid = res;
        this.provider.getStudentLessons(this.studentid, 0).then(res1=>{
          this.slessons = res1;
        });
      }
    );  }

}
