import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  progress:number=0
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }

  itemTapped(event, item) {
   var Timer =  setInterval(()=>{
       this.progress++;
       if(this.progress>=100){
         clearInterval(Timer)
       }
    })
  }
  ProgressChange(progress:number){
    console.log(progress)
  }
}
