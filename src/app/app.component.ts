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
  username = ""
  img = ""
  pass = ""
  repass = ""
  
  constructor(private zoocareservice: ZoocareService,private alertController: AlertController) {
    let idAkunString=localStorage.getItem("app_id") ?? ''
    this.idAkun= parseInt(idAkunString)
    this.username=localStorage.getItem("app_username") ?? ''
    this.img=localStorage.getItem("app_img") ?? ''
  }
  ngOnInit(){
    this.checkTheme()
    this.checkLogin()
  }
  checkTheme(){
    const validasi=localStorage.getItem("app_dark")
    if(validasi=="true"){
      document.body.classList.toggle("dark", true)
      this.isDark=true
    }
  }
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
               this.img=response.img

               localStorage.setItem("app_login","true")
               localStorage.setItem("app_id",this.idAkun.toString())
               localStorage.setItem("app_username",this.username)
               localStorage.setItem("app_img",this.img)
               
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
    if(this.username==""||this.pass==""||this.repass==""||this.img==""){
      this.presentAlert("The data entered cannot be empty!")
    }
    else{
      let new_date= new Date().toJSON().slice(0, 19).replace('T', ' ');
      // console.log(new Date())
      // console.log(this.new_date)
      if(this.pass==this.repass){
        this.zoocareservice.addAccount(
          this.username,
          this.pass,
          this.img,
          new_date

    
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
    this.username=""
    this.pass=""
    this.repass=""
    this.img=""
    localStorage.removeItem("app_login")
    localStorage.removeItem("app_id")
    localStorage.removeItem("app_username")
    localStorage.removeItem("app_img")
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
