import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { IRoom, IRoomPaginated } from 'src/app/models/models';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  
  public rooms: IRoom[]=[];
  public roomspag: IRoomPaginated;

  offsetint = 0;
  count = 0;
  pagecount = 0;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getRooms().then(res=>{
      this.rooms = res;
    });
    this.provider.getRoomsPag(this.offsetint).then(res=>{
      this.offsetint = this.offsetint + 5;
      this.roomspag = res;
      this.rooms = res.results;
      this.count = res.count;
      if(this.count%5==0)
      this.pagecount = this.count / 5;
      else if(this.count%5!=0){
        this.pagecount = (this.count / 5) + 1;
      }
    })
  }

  nextPage() {
    this.offsetint = this.offsetint + 5;
    this.provider.getRoomsPag(this.offsetint).then(res=>{
      this.rooms = res.results;
    });
  }

  previousPage() {
    this.offsetint = this.offsetint - 5;
    this.provider.getRoomsPag(this.offsetint).then(res=>{
      this.rooms = res.results;
    });
  }
}
