import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // private frase: Auth = { user: "", pwd: "", token: "", msq: "" };
  constructor(private http:HttpClient) { }

  public get( ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
    .set('user', 'admin')
    .set('password', '123123')
      return this.http.post<Auth>("https://app-soccer-team.herokuapp.com/user", body,{headers:headers});

  }
  public getInfoTeam(team:string,token:string){
    const headers= new HttpHeaders()
    .set( 'Authorization', `Bearer ${token}`);
    const params = new HttpParams()
    .set('nombre', team)
    const req = this.http.get<Match[]>('https://app-soccer-team.herokuapp.com/equipo',{ headers: headers,params:params });
    return req;
  }
}
