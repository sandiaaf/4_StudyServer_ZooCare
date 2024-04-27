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
  

  keepers:any[] = []

  constructor(private zoocareservice: ZoocareService, private appcomponent:AppComponent) { }

  ngOnInit() {
    this.zoocareservice.keeperList().subscribe(
      (data)=> {
        this.keepers = data
      }
    )
  }

}
