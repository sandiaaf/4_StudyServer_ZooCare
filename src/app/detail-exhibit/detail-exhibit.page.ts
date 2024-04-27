import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoocareService } from '../zoocare.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detail-exhibit',
  templateUrl: './detail-exhibit.page.html',
  styleUrls: ['./detail-exhibit.page.scss'],
})
export class DetailExhibitPage implements OnInit {

  
  idkeeper = 0
  isHead = true

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  keepers:any[]=[]
  animals:any[]=[]
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
    ]).subscribe(([keepers, animals]) => {
      this.keepers = keepers;
      this.animals = animals;
      
      this.getSchedule();
    });
    
  }

  getSchedule(){
    for(let k of this.keepers){
      if(this.idkeeper==k.id){
        for(let a of this.animals){
          if(k.job_class_id == a.animal_class_id){
            const date = new Date(a.clean_date);
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();
            const minutes = date.getMinutes();
            const hours = date.getHours();
            let new_date = day+"-"+(monthIndex+1)+"-"+year
            let new_hour = hours+":"+minutes
            this.schedules.push({id:a.id,name:a.name,species:a.species,clean_date:new_date,clean_hour:new_hour})
          }
        }
      }
    }
  }

}
