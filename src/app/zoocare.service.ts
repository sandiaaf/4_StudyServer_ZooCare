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
      "https://localhost/zoocaredb/login.php", urlEncodedData, { headers });
  }
  addAccount(p_username:string, p_pass:string, p_image:string, p_date:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', p_username);
    body.set('password', p_pass);
    body.set('img', p_image);
    body.set('date_now', p_date);

    const urlEncodedData = body.toString();
    return this.http.post(
      "https://localhost/zoocaredb/new_account.php", urlEncodedData, { headers });
  }

  classList(): Observable<any> {
      return this.http.get("https://localhost/zoocaredb/new_account.php");
  }

  animalList(): Observable<any> {
    return this.http.get("https://localhost/zoocaredb/animals.php");
  }
  menuList(): Observable<any> {
    return this.http.get("https://localhost/zoocaredb/menus.php");
  }
  vitaminList(): Observable<any> {
    return this.http.get("https://localhost/zoocaredb/vitamins.php");
  }

  keeperList(): Observable<any> {
    return this.http.get("https://localhost/zoocaredb/keepers.php");
  }

  cariAnimal(name:string): Observable<any> {
    return this.http.get("https://localhost/zoocaredb/cari_animal.php?name="+name);
  }

  addAnimal(p_id:number, p_name:string, p_species:string, p_image:string, p_class_id:number){

  }

  
}
