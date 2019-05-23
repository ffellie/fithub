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

  isocc = false;
  offsetint = 0;
  currentpage = 1;
  count = 0;
  pagecount = 0;


  searchadm = false;
  searchocc = false;
  searchingnumber = 0;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getRoomsPag(this.offsetint).then(res=>{
      this.roomspag = res;
      this.rooms = res.results;
      this.count = res.count;
      if(this.count%5==0)
      this.pagecount = this.count / 5;
      else if(this.count%5!=0){
        this.pagecount = (this.count / 5);
      }
      console.log(this.pagecount);
    })
  }

  changeOccupation(item: IRoom){
    this.isocc = !item.isoccupied;
    this.provider.updateRoom(item.id, item.number, item.isadministrative, item.postfix, this.isocc).then(res=>{
      this.provider.getRoomsPag(this.offsetint).then(res=>{
        
        this.rooms = res.results;
      });
    });
  }

  nextPage() {
    this.currentpage = this.currentpage + 1;
    this.offsetint = this.offsetint + 5;
    this.provider.getRoomsPag(this.offsetint).then(res=>{
      this.rooms = res.results;
    });
  }

  enableAdm(){
    if(this.searchadm && !this.searchocc){
      this.searchadm = false;
      this.provider.getRoomsPag(this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }
    else 
    if(!this.searchadm){
      this.searchadm = true;
      this.provider.getAdmRooms('true', this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }
    else
    if(!this.searchadm && this.searchocc){
      this.searchadm = true;
      this.provider.getAdmOccRooms('true', 'false', this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }
    else
    if(this.searchadm && this.searchocc){
      this.searchocc = true;
      this.provider.getOccupiedRooms('false', this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }

  }

  enableOcc(){
    if(this.searchocc && !this.searchadm){
      this.searchocc = false;
      this.provider.getRoomsPag(this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }
    else 
    if(!this.searchocc){
      this.searchocc = true;
      this.provider.getOccupiedRooms('false', this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }
    else
    if(this.searchadm && !this.searchocc){
      this.searchocc = true;
      this.provider.getAdmOccRooms('true', 'false', this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }
    else
    if(this.searchadm && this.searchocc){
      this.searchadm = true;
      this.provider.getAdmRooms('true', this.offsetint).then(res=>{
        this.rooms = res.results;
      });
    }
  }

  makeSearch(){
    this.provider.getSearchByNumber(this.searchingnumber, this.offsetint).then(res=>{
      this.rooms = res.results;
    });
  }

  previousPage() {
    this.currentpage = this.currentpage - 1;
    this.offsetint = this.offsetint - 5;
    this.provider.getRoomsPag(this.offsetint).then(res=>{
      this.rooms = res.results;
    });
  }
}
