import { Component } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soccer-app';
  loading:boolean=false;
  error:boolean=false;
  errorService:boolean=false;
  errorApi:boolean=false;
  bearerToken:string='';
  favTeam: string='';
  partidos:any;
  time: number = 60;
  display: number = 100;
  interval:any;

  startTimer() {
    console.log("=====>");
    this.interval = setInterval(() => {
        this.time--;
        this.display=(this.time*100)/60;
        if(this.time==0){
          clearInterval(this.interval);
        }

    }, 1000);
  }
  transform(value: number): string {
       const minutes: number = Math.floor(value / 60);
       return minutes + ':' + (value - minutes * 60);
  }
  constructor (private searchService:SearchService){}

  ngOnInit(){
    // this.startTimer();
    this.cargarData();
  }

  cargarData(){
    this.searchService.get().subscribe(data => {
      this.bearerToken=data.token.replace("Bearer ","");
      console.log(this.bearerToken);
      console.log(data);
      this.startTimer();
  }, (error) => {                              //Error callback

    this.errorApi = true;

  });
    // this.searchService.get("http://app-soccer-team.herokuapp.com/user");
  }


  searchTeam(){
    this.loading=true;
    this.error=false;
    this.errorService=false;
    this.searchService.getInfoTeam(this.favTeam,this.bearerToken).subscribe(data => {
      console.log(data);
      if(data.length==1)
        this.error=true;
      this.partidos=data;
      this.loading=false;
  }, error =>   {this.loading=false;this.errorService=true;});


  }
}
