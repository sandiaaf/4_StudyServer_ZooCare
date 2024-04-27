import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  idAkun=0
  page = ""

  constructor(private route:ActivatedRoute,private appcomponent:AppComponent) { }

  ngOnInit() {
    this.idAkun = this.appcomponent.idAkun
    this.route.params.subscribe(
      params => {
        this.page = params['page']
      }
    )
  }
  backNotif() {
    return this.page
  }

}
