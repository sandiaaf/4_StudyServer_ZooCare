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
  isHeadStr= ""
  isHead= true

  alreadySubmit = false
  image=""

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  keepers:any[]=[]
  animals:any[]=[]
  schedules:any[]=[]
  constructor(private route:ActivatedRoute,private zoocareservice: ZoocareService) { }

  ngOnInit() {
    this.isHeadStr=localStorage.getItem("app_ishead") ?? ''
    if(this.isHeadStr== 'true'){
      this.isHead= true
    }else{
      this.isHead= false
    }

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


            let lastChar = minutes.toString().slice(-1)
            let new_hour = ""

            console.log(lastChar)

            if(parseInt(lastChar)==0 && minutes.toString().length == 1){
              new_hour = hours+":"+minutes+"0"
            }else{
              new_hour = hours+":"+minutes
            }

            console.log(new_hour)
            this.schedules.push({id:a.id,name:a.name,species:a.species,clean_date:new_date,clean_hour:new_hour})
          }
        }
      }
    }
  }
  submit(id_animal:number){
    if(this.image!=""){
      let dateTime = new Date().toJSON().slice(0, 19).replace('T', ' ');

      console.log(dateTime)

      let activity = "BersihPenangkaran"
      let activity_f = 1

      this.zoocareservice.addReport(
        activity,
        this.image,
        activity_f,
        dateTime,
        this.idkeeper,
        id_animal
      ).subscribe((response: any) => {
        if (response.result === 'success') {
          alert("success")
          this.alreadySubmit = true
        }
        else {
          alert(response.message)
        }
      });
      
    }
    else{

    }
  }

}
