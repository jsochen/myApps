import {Component,EventEmitter,Input,Output} from '@angular/core';
import Hero from '../../Comon/Hero';

@Component({
        selector:'hero-form',
        templateUrl:'./hero-form.component.html',
})


export class HeroFormComponent{
    position:Position = {X:0,Y:0};
    progress:number = 0;
    FirstDivHeight:number = 0;
    SecondDivHeight:number = 0;
    ThirdDivWidth:number = 0;
    numbers:number=0;
    FirstStyle:Object ={
       'height':this.FirstDivHeight+"px",
       'background':'0px '+this.FirstDivHeight+'px'
    };
    SecondStyle:Object ={
      'height':this.SecondDivHeight+'px'
    };
    ThirdStyle:Object ={
      'width':this.ThirdDivWidth+"px"
    };
    constructor(){
   };
   TouchStartEvent(e){
     this.position.X = parseInt(e.touches[0].clientX);
     this.position.Y = parseInt(e.touches[0].clientY);
   };
   TouchMoveEvent(e){
      var lastPosition = new Position(parseInt(e.touches[0].clientX),parseInt(e.touches[0].clientY));
      var message = this.ChangeDivNumber(this.progress,this.position,lastPosition);
      console.log(message)
      //var pro = 300-e.touches[0].clientY
      if(message.progressDiv==1){
       this.progress = this.progress+message.value;
       this.numbers=Math.round(this.progress/3);
        this.FirstDivHeight = this.progress*2
         if(this.progress<=0){
           this.progress = 0;
            this.numbers=0;
           this.FirstDivHeight = 0;
        }
         this.FirstStyle ={
          'height':this.FirstDivHeight+"px",
          'background-position':'0px '+this.FirstDivHeight+'px'
        }
      }else if(message.progressDiv==2){
        this.progress = this.progress+message.value;
        this.numbers=Math.round(this.progress/3);
        this.SecondDivHeight = (this.progress-150)*2;
        if(this.progress>300){
          this.progress=300;
          this.numbers=Math.round(this.progress/3);
          this.SecondDivHeight = 600
        }
         this.SecondStyle ={
          'height':this.SecondDivHeight+"px"
        }
      }
        if(this.progress<=150){
            this.SecondDivHeight=0;
            this.SecondStyle ={
            'height':this.SecondDivHeight+"px"
          }
        }
         if(this.progress>=125&&this.progress<200){
          console.log("sssss")
          this.ThirdDivWidth = (this.progress-74)*2;
          this.ThirdStyle ={
            'width':this.ThirdDivWidth+'px'
            }
        }
        else{
          this.ThirdStyle ={
            'width':0+'px'
            }
        }
      console.log(this.progress)
      this.position.X = parseInt(e.touches[0].clientX);
      this.position.Y = parseInt(e.touches[0].clientY);
   };
   ChangeDivNumber(progress:number,lastPosition:Position,nowPosition:Position){
       if(progress>=0&&progress<75){
         if((nowPosition.X>lastPosition.X)&&(nowPosition.Y>lastPosition.Y)){
           if(progress-(nowPosition.Y-lastPosition.Y)<=0){
             return {progressDiv:1,value:(nowPosition.Y-lastPosition.Y)}
           }else{
             return {progressDiv:1,value:-progress}
           }
         }else if((nowPosition.X<lastPosition.X)&&(nowPosition.Y<lastPosition.Y)){
            return {progressDiv:1,value:(lastPosition.Y-nowPosition.Y)}
         }
       }else if(progress>=75&&progress<150){
         if((nowPosition.X>lastPosition.X)&&(nowPosition.Y<lastPosition.Y)){        
             return {progressDiv:1,value:(lastPosition.Y-nowPosition.Y)}     
         }else if((nowPosition.X<lastPosition.X)&&(nowPosition.Y>lastPosition.Y)){
             return {progressDiv:1,value:(lastPosition.Y-nowPosition.Y)}
         }
       }else if(progress>=150&&progress<225){
         if((nowPosition.X>lastPosition.X)&&(nowPosition.Y>lastPosition.Y)){ 
             return {progressDiv:2,value:(nowPosition.Y-lastPosition.Y)}
         }else if((nowPosition.X<lastPosition.X)&&(nowPosition.Y<lastPosition.Y)){
            return {progressDiv:2,value:(nowPosition.Y-lastPosition.Y)}
         }
       }else if(progress>=225&&progress<=302){
         if((nowPosition.X<lastPosition.X)&&(nowPosition.Y>lastPosition.Y)){
           if(progress+(lastPosition.Y-nowPosition.Y)>=300){
             return {progressDiv:2,value:-4}
           }else{
             return {progressDiv:2,value:(nowPosition.Y-lastPosition.Y)}
           }
         }else if((nowPosition.X>lastPosition.X)&&(nowPosition.Y<lastPosition.Y)){
             return {progressDiv:2,value:(nowPosition.Y-lastPosition.Y)}
         }
       }
       return {progressDiv:null,value:null}
   }
}
class Position {
     X:number;
     Y:number;
     constructor(X:number = 0,Y:number = 0){
       this.X = X;
       this.Y = Y;
     }
}