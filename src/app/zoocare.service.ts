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
      "https://ubaya.me/hybrid/160421110/cerbung/login.php", urlEncodedData, { headers });
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
      "https://ubaya.me/hybrid/160421110/cerbung/new_account.php", urlEncodedData, { headers });
  }

  classList(): Observable<any> {

  }

  addAnimal(p_id:number, p_name:string, p_species::string, p_image:string, p_class_id:number){

  }

  
}
