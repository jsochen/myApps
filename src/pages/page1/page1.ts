import { Component } from '@angular/core';
import {Http} from '@angular/http'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
   name:string="mycan";
   pro:number =0;
  constructor(public navCtrl: NavController,private http:Http) {
    // var timer = setInterval(()=>{
    //    this.pro=this.pro+1;
    //    //console.log(this.pro);
    //    if(this.pro>100){
    //      clearInterval(timer);
    //    }
    // },20)
  };
  ChangeName(name:string){
   console.log(name)
  };
  ProgressChange(progress:number){
    console.log(progress)
  }
}
