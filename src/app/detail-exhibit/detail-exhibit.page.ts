import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoocareService } from '../zoocare.service';

@Component({
  selector: 'app-detail-exhibit',
  templateUrl: './detail-exhibit.page.html',
  styleUrls: ['./detail-exhibit.page.scss'],
})
export class DetailExhibitPage implements OnInit {

  
  idkeeper = 0
  keepers:any[]=[]
  animals:any[]=[]
  animalsNew:any[]=[]
  menus:any[]=[]
  schedules:any[]=[]
  constructor(private route:ActivatedRoute,private zoocareservice: ZoocareService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.idkeeper = params['idkeeper']
      }
    )
    this.zoocareservice.keeperList().subscribe(
      (data) => {
        this.keepers = data;
      }
    );
    this.zoocareservice.animalList().subscribe(
      (data) => {
        this.animals = data;
      }
    );
    this.zoocareservice.menuList().subscribe(
      (data) => {
        this.menus = data;
        this.getAnimalNew()
        this.getSchedule()
        console.log(this.animalsNew)
        console.log(this.schedules)

      }
    );
    
  }

  getAnimalNew(){
    for(let k of this.keepers){
      if(this.idkeeper==k.id){
        for(let a of this.animals){
          if(k.job_class_id == a.animal_class_id){
            this.animalsNew.push({id:a.id,name:a.name,species:a.species})
          }
        }
      }
    }
  }
  getSchedule(){
    for(let m of this.menus){
      for(let aa of this.animalsNew){
        if(m.animal_id==aa.id){
          this.schedules.push({id:aa.id,name:aa.name,species:aa.species,hour:m.feed_time})
        }
      }
    }
  }

}
