import { Component, OnInit } from '@angular/core';
import { ZoocareService } from '../zoocare.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {
  classStatus="All"
  pathdetailanimal=""
  name=""
  idAkun=0

  animals:any[] = []
  classes:any[] = []
  // conts:any[] = []

  genreClick(validasi:string){
    this.classStatus= validasi
    console.log(`Button "${validasi}" ditekan.`)

  }
  ionViewWillEnter() {
    this.ngOnInit();
  }

  constructor(private zoocareservice: ZoocareService,private appcomponent:AppComponent) {}

  ngOnInit() {
    this.cariAnimal()
    this.zoocareservice.classList().subscribe(
      (data) => {
        this.classes = data.map((classA:any) => classA.name);
      }
    );

    // this.cerbungservice.paragraphList().subscribe(
    //   (data) => {
    //     this.conts = data;
    //   }
    // );
    this.idAkun = this.appcomponent.idAkun
  }
  
  toDetailAnimal(id:number){
    return this.pathdetailanimal="/animal-detail/"+id;
  }

  cariAnimal() {
    if(this.name==""){
      this.zoocareservice.animalList().subscribe(
        (data) => {
          this.animals = data;
        }
      )
    } else {
      this.zoocareservice.cariAnimal(this.name).subscribe(
        (data) => {
          this.animals = data;
        }
      )
    }
    
  }
  pathNotif(idAkun:number){
    return "notifications/home"
  }  
}

