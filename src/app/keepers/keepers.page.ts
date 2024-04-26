import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.page.html',
  styleUrls: ['./keepers.page.scss'],
})
export class KeepersPage implements OnInit {


  keepers:any[] = []

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

}
