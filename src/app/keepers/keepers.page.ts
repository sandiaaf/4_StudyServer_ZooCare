import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoocareService } from '../zoocare.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.page.html',
  styleUrls: ['./keepers.page.scss'],
})
export class KeepersPage implements OnInit {

  idKeeper = 0
  isHeadStr= ""
  isHead= true
  
  keepers:any[] = []

  constructor(private zoocareservice: ZoocareService, private appcomponent:AppComponent) { }

  ngOnInit() {
    this.isHeadStr=localStorage.getItem("app_ishead") ?? ''
    if(this.isHeadStr== 'true'){
      this.isHead= true
    }else{
      this.isHead= false
    }

    this.zoocareservice.keeperList().subscribe(
      (data)=> {
        this.keepers = data
      }
    )
  }

}
