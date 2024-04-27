import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ZoocareService } from './zoocare.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  login=false
  isDark=false
  formSignUp = false
  idAkun=0
  headkeepers:any[] = []
  classes:any[] = []
  animals:any[] = []

  firstName = ""
  lastName = ""
  username = ""
  email = ""
  phoneNumber = ""
  headKeeper = 0
  jobClass = 0
  // img = ""
  pass = ""
  repass = ""
  dateInterval:any
  timeInterval:any

  isModalOpen = false;


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
  constructor(private zoocareservice: ZoocareService,private alertController: AlertController) {
    // this.dateInterval = setInterval(
    //   ()=> {
    //     this.checkDate()
    //   }, 60000 //every minute (60000 ms)
    // )

    this.timeInterval = setInterval(
      ()=> {
        this.checkTime()
      }, 1000
    )

    let idAkunString=localStorage.getItem("app_id") ?? ''
    this.idAkun= parseInt(idAkunString)
    this.username=localStorage.getItem("app_username") ?? ''
    // this.img=localStorage.getItem("app_img") ?? ''
  }

  ngOnInit(){
    // this.checkTheme()
    this.zoocareservice.get_headkeeper_data().subscribe(
      (data)=> {
        this.headkeepers = data
      }
    )
    this.zoocareservice.get_animalclass_data().subscribe(
      (data)=> {
        this.classes = data
      }
    )
    this.zoocareservice.animalList().subscribe(
      (data)=> {
        this.animals = data
      }
    )
    this.checkLogin()
  }

  checkTime() {
    const currentTime = new Date()

    this.animals.forEach(animal=> {
      // const cleanDate = new Date(animal.clean_date)
      // if (currentTime.getHours() == cleanDate.getHours() && currentTime.getMinutes() == cleanDate.getMinutes()) {
      //   this.presentAlert("Today is cleaning day for " + animal.name + " | " + animal.species + ". At " + animal.clean_date)
      //   clearInterval(this.timeInterval)
      // }

      // const scheduleTime = new Date()
      // scheduleTime.setHours(23)
      // scheduleTime.setMinutes(26)
      // scheduleTime.setSeconds(0)
      // if (currentTime >= scheduleTime) {
      //   let message = "Today is cleaning day for " + animal.name + " | " + animal.species + ". At " + animal.clean_date
      //   this.presentAlert(message)
      //   clearInterval(this.timeInterval)
      //   localStorage.setItem("app_notifications", message)
      // }
    })

    // const scheduleTime = new Date()
    // scheduleTime.setHours(21)
    // scheduleTime.setMinutes(23)
    // scheduleTime.setSeconds(0)

    // if (currentTime >= scheduleTime) {
    //   this.presentAlert("NOTIF")
    //   clearInterval(this.dateInterval)
    // }
  }

  // checkDate() {
  //   const currentDate = new Date()

  //   this.animals.forEach(animal=> {
  //     const cleanDate = new Date(animal.clean_date)

  //     if (currentDate.getFullYear() == cleanDate.getFullYear() && currentDate.getMonth() == cleanDate.getMonth() && currentDate.getDate() == cleanDate.getDate()) {
  //       this.presentAlert("Today is cleaning day for " + animal.name + " | " + animal.species + ". At " + animal.clean_date)
  //     }
  //   })
  // }

  // checkTheme(){
  //   const validasi=localStorage.getItem("app_dark")
  //   if(validasi=="true"){
  //     document.body.classList.toggle("dark", true)
  //     this.isDark=true
  //   }
  // }
  checkLogin(){
    if(localStorage.getItem("app_login")=="true"){
      this.login=true
    }
  }

  signIn() {
    if (this.username == "" || this.pass == "" || this.repass == "") {
      this.presentAlert("The data entered cannot be empty!")
    }
    else {
      if (this.pass == this.repass) {
        this.zoocareservice.login(this.username,this.pass).subscribe(
          (response: any) => {
             if(response.result==='success'){
               this.login = true;
               this.idAkun=response.id
              //  this.img=response.img

              localStorage.setItem("app_login","true")
              localStorage.setItem("app_id",this.idAkun.toString())
              localStorage.setItem("app_username",response.username)

              for(let hk of this.headkeepers){
                if(hk.id == this.idAkun){
                  localStorage.setItem("app_ishead",'true')
                  break
                }
                else{
                  localStorage.setItem("app_ishead",'false')
                }
              }
              //  localStorage.setItem("app_img",this.img)
               
               alert("success")
              }
              else
              {
                alert(response.message)
              }
       });
      } else {
        this.presentAlert("Your password is not the same as the retype password!")
      }

    }
    
  }
  
  signUp(){
    if(this.firstName=="" || this.lastName=="" || this.username==""|| this.email=="" || this.pass==""||this.repass=="" || this.phoneNumber==""){
      this.presentAlert("The data entered cannot be empty!")
    }
    else{
      let new_date= new Date().toJSON().slice(0, 19).replace('T', ' ');
      // console.log(new Date())
      // console.log(this.new_date)
      if(this.pass==this.repass){
        this.zoocareservice.addAccount(
          this.firstName,
          this.lastName,
          this.username,
          this.email,
          this.phoneNumber,
          this.headKeeper,
          this.jobClass,
          this.pass
        ).subscribe((response: any) => {
          if (response.result === 'success') {
            this.presentAlert("Sign Up successfully!")
            this.formSignUp=false
          }else {
            alert(response.message)
          }
        });
      }
      else{
        this.presentAlert("Your password is not the same as the retype password!")
      }
    }
  }
  showSignUp(){
    this.formSignUp=true
  }
  showSignIn(){
    this.formSignUp=false
  }
  logout()
  {
    this.login=false
    this.idAkun=0
    this.firstName = ""
    this.lastName = ""
    this.username = ""
    this.email = ""
    this.phoneNumber = ""
    this.headKeeper = 0
    this.jobClass = 0
    this.pass=""
    this.repass=""

    
    localStorage.removeItem("app_login")
    localStorage.removeItem("app_id")
    localStorage.removeItem("app_username")
    localStorage.removeItem("app_ishead")
    localStorage.removeItem("app_notifications")
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
