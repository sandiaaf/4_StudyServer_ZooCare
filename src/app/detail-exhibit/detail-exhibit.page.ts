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
  status = "danger"

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  keepers:any[]=[]
  animals:any[]=[]
  schedules:any[]=[]
  reports:any[] = []
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
      this.zoocareservice.reportList()
    ]).subscribe(([keepers, animals, reports]) => {
      this.keepers = keepers;
      this.animals = animals;
      this.reports = reports
      
      this.getSchedule();
    });
  }

  getReportStatus(date:string,id:number) {
    this.status = "danger"
    let activity = "BersihPenangkaran"
    
    for (let r of this.reports) {
      if (r.user_keeper_id == this.idkeeper) {
        for (let a of this.animals) {
          let formattedDate = this.formatDate(a.clean_date)
          if (r.animal_id == a.id && formattedDate == date) {
            if (activity == r.activity_name && r.activity_finished == 1) {
              let tag = id + "e"
              this.changeColorButtonE(tag)
              return
            }
            else {
            }
          }
        }
      }
    }
  }

  formatDate(inputDate: string) {
    let dates = inputDate.split(' ')[0].split('-')
    let year = dates[0]
    let month = parseInt(dates[1])
    let day = parseInt(dates[2])
    return day + "-" + month + "-" + year
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
  submit(id_animal:number,input:string){
    if(input!=""){
      let dateTime = new Date().toJSON().slice(0, 19).replace('T', ' ');

      console.log(dateTime)

      let activity = "BersihPenangkaran"
      let activity_f = 1

      this.zoocareservice.addReport(
        activity,
        input,
        activity_f,
        dateTime,
        this.idkeeper,
        id_animal
      ).subscribe((response: any) => {
        if (response.result === 'success') {
          alert("success")
          this.hideButton(id_animal)

        }
        else {
          alert(response.message)
        }
      });
      
    }
    else{

    }
  }
  hideButton(id_s:number) {
    const buttonToHide = document.getElementById(id_s.toString());
    if (buttonToHide) {
      buttonToHide.style.display = 'none';
    }
  }
  changeColorButton(id_s:number) {
    const buttonToHide = document.getElementById(id_s.toString());
    if (buttonToHide) {
      buttonToHide.textContent = "DONE";
    }
  }
  changeColorButtonE(tagid:string) {
    const buttonToHide = document.getElementById(tagid);
    if (buttonToHide) {
      buttonToHide.textContent = "DONE";
    }
  }

}
