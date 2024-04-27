import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoocareService } from '../zoocare.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.page.html',
  styleUrls: ['./animal-detail.page.scss'],
})
export class AnimalDetailPage implements OnInit {

  idanimal = 0

  menus:any[] = []
  consumtions:any[] = []
  vitamins:any[] = []


  constructor(private route:ActivatedRoute,private zoocareservice: ZoocareService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.idanimal = params['idanimal']
      }
    )
    this.zoocareservice.menuList().subscribe(
      (data) => {
        this.menus = data;
      }
    );
    this.zoocareservice.consumtionList().subscribe(
      (data) => {
        this.consumtions = data;
      }
    )
    this.zoocareservice.vitaminList().subscribe(
      (data) => {
        this.vitamins = data;
      }
    )
  }

}
