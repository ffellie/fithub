import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/models';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  courses : Course[] = [
    {
      id:1,
      name:'WebKa',
      description:'bobur'
    },
    {
      id:2,
      name:'DD',
      description:'apai'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
