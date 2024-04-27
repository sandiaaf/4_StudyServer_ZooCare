import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoocareService } from '../zoocare.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-keeper-detail',
  templateUrl: './keeper-detail.page.html',
  styleUrls: ['./keeper-detail.page.scss'],
})
export class KeeperDetailPage implements OnInit {

  idkeeper = 0
  isHead=true
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

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
    forkJoin([
      this.zoocareservice.keeperList(),
      this.zoocareservice.animalList(),
      this.zoocareservice.menuList()
    ]).subscribe(([keepers, animals, menus]) => {
      this.keepers = keepers;
      this.animals = animals;
      this.menus = menus;
      
      this.getAnimalNew();
    });
    
  }

  getAnimalNew(){
    for(let k of this.keepers){
      if(this.idkeeper==k.id){
        for(let a of this.animals){
          if(k.job_class_id == a.animal_class_id){
            this.animalsNew.push({id:a.id,name:a.name,species:a.species})
            this.getSchedule()
            break
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
          break
        }
      }
    }
  }

}