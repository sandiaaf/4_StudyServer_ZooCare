import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoocareService {

  constructor(private http: HttpClient) { }
  
  login(p_username: string, p_password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', p_username);
    body.set('password', p_password);
    const urlEncodedData = body.toString();
    return this.http.post(
      "http://localhost/zoocaredb/login.php", urlEncodedData, { headers });
  }
  addAccount(p_firstName:string, p_lastName:string, p_username:string, p_email:string, p_phoneNumber:string, p_headKeeper:number, p_jobClass:number, p_pass:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('first_name', p_firstName);
    body.set('last_name', p_lastName);
    body.set('username', p_username);
    body.set('email', p_email);
    body.set('password', p_pass);
    body.set('phone_number', p_phoneNumber);
    body.set('head_keeper', p_headKeeper.toString());
    body.set('job_class', p_jobClass.toString());
    console.log(p_headKeeper + p_jobClass)

    const urlEncodedData = body.toString();
    return this.http.post(
      "http://localhost/zoocaredb/new_account.php", urlEncodedData, { headers });
  }

  classList(): Observable<any> {
      return this.http.get("http://localhost/zoocaredb/new_account.php");
  }

  animalList(): Observable<any> {
    return this.http.get("http://localhost/zoocaredb/animals.php");
  }
  menuList(): Observable<any> {
    return this.http.get("http://localhost/zoocaredb/menus.php");
  }
  vitaminList(): Observable<any> {
    return this.http.get("http://localhost/zoocaredb/vitamins.php");
  }

  keeperList(): Observable<any> {
    return this.http.get("http://localhost/zoocaredb/keepers.php");
  }

  cariAnimal(name:string): Observable<any> {
    return this.http.get("http://localhost/zoocaredb/cari_animal.php?name="+name);
  }

  addAnimal(p_id:number, p_name:string, p_species:string, p_image:string, p_class_id:number){

  }

  get_headkeeper_data(): Observable<any> {
    return this.http.get("http://localhost/zoocaredb/get_headkeeper.php");
  }
  
  get_animalclass_data(): Observable<any> {
    return this.http.get("http://localhost/zoocaredb/get_animalclass.php");
  }
}
