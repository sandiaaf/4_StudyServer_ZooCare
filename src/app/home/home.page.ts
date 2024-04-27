import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ZoocareService } from '../zoocare.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  guides: any[] = []
  actions: any[] = []

  nafsuMakan = false
  tingkatEnergi = false
  garuk = false
  lesu = false
  sulitNapas = false
  agresif = false

  constructor(private zoocareservice:ZoocareService, private alertController: AlertController) { }

  ngOnInit() {
    this.zoocareservice.guideList().subscribe(
      (data) => {
        this.guides = data
      }
    )
    this.zoocareservice.guide_actionList().subscribe(
      (data) => {
        this.actions = data
      }
    )
  }

  checkPrognosis() {
    let prognosis = ""
    if (this.nafsuMakan == true && this.tingkatEnergi == true) {
      prognosis = "Kemungkinan gangguan Pencernaan, seperti maag atau sakit perut biasa"
    }
    else if (this.tingkatEnergi == true && this.lesu == true && this.nafsuMakan == true) {
      prognosis = "Kemungkinan infeksi virus atau bakteri"
    }
    else if (this.tingkatEnergi == true && this.lesu == true && this.nafsuMakan == false) {
      prognosis = "kemungkinan terdapat penyakit ginjal, terutama jika ditemani dengan sering buang air kecil"
    }
    else if (this.tingkatEnergi == true && this.garuk == true) {
      prognosis = "Kemungkinan reaksi alergi atau infeksi kulit"
    }
    else if (this.sulitNapas == true) {
      prognosis = "Kemungkinan infeksi saluran pernapasan"
    }
    else if (this.garuk == true) {
      prognosis = "Banyak kemungkinan, seperti alergi, parasit, infeksi kulit, dan sebagainya"
    }
    else if (this.agresif == true) {
      prognosis = "Kemungkinan rasa sakit atau ketidaknyamanan, ketakutan, atau gelisah"
    }
    else if (this.nafsuMakan == true) {
      prognosis = "Kemungkinan gangguan pencernaan"
    }
    else if (this.tingkatEnergi == true || this.lesu == true) {
      prognosis = "Kemungkinan penyakit, seperti masalah saluran pencernaan, artritis, atau depresi"
    }
    else {
      prognosis = "Kekurangan data untuk menarik kesimpulan"
    }
    this.presentAlert(prognosis)
    this.nafsuMakan = false
    this.tingkatEnergi = false
    this.garuk = false
    this.lesu = false
    this.sulitNapas = false
    this.agresif = false
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Information',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
