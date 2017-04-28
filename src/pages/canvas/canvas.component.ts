import { Component,Input,Output,SimpleChange,OnChanges,AfterViewInit,EventEmitter} from '@angular/core';
import {getElementLeft,getElementTop} from './common';

var PA = Math.PI;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
})

export class CanvasComponent  implements OnChanges,AfterViewInit{
    @Input() canvasId:string="mycanvas";    //绘制canvas的id唯一 默认 mycanvas
    @Input() progress:number=0;            //进度数值   默认 0
    @Input() max:number = 100;            //最大值  默认 100
    @Input() min:number =0;               //最小值  默认 0
    @Input() enable:boolean = true;     //是否不能使用 默认false不可以使用
    @Input() Radius:number = 150;
    @Input() FrontImageUrl:string="";
    @Input() behindImageUrl:string="";
    @Output() IdChange = new EventEmitter<string>();    //canvasid改变抛出事件
    @Output() ProgressChange = new EventEmitter<number>();  //进度改变抛出事件
    @Output() enableChange = new EventEmitter<boolean>();   //能否使用抛出事件
    offsetLeft:number = 0;
    offsetTop:number = 0;
    canvas:any;
    FrontImage:any;
    behindImage:any;
    constructor(){
      
    };
    ngAfterViewInit(){
      var img = new Image();   // Create new img element
      img.addEventListener('load', ()=>{
       this.FrontImage = img;
      if(this.enable){
        this.currentPaint(this.UserProgressToSys(this.progress,this.max,this.min)); 
      }
      else{
        this.currentPaint(this.UserProgressToSys(this.max,this.max,this.min));
      }
       
     }, false);
     img.src = this.FrontImageUrl; // Set source path
     console.log(this.FrontImageUrl)
      var img2 = new Image();   // Create new img element
     img2.addEventListener('load', ()=>{
       this.behindImage = img2;
      if(this.enable){
        this.currentPaint(this.UserProgressToSys(this.progress,this.max,this.min));
      }
      else{
        this.currentPaint(this.UserProgressToSys(this.max,this.max,this.min));
      }
     }, false);
      img2.src =this.behindImageUrl ; // Set source path
      };
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
      for(let propName in changes){
        let ChangedProp = changes[propName];
        if(propName=="progress"){
          if(this.IsCanvas()){
             if(this.enable){
               this.currentPaint(this.UserProgressToSys(changes[propName].currentValue,this.max,this.min));
             }
          }
        }
      }
    };
    //内部进度转用户进度
    SystemProgressToUser(endAngle,max,min){
       let inProgress = this.progressToProgress(endAngle);
       return inProgress/PA/5*3*(max-min);
    }
    //用户的进度转内部进度再转内部角度
    UserProgressToSys(angle,max,min){
      let currentangle = this.currentProgress(angle,max,min);
      let proportion = PA/3*5/(max-min);                        
      return this.ProgressToAngle((currentangle-min)*proportion);

    };
    //判断进度是否是max和min之内的
    currentProgress(progress,max,min){
          let curangle:number= 0;
            if(progress>max){
              curangle = max
            }else if(progress<min){
              curangle =min
            }else{
              curangle = progress;
            }
            return curangle;
    };
    //角度转进度
    progressToProgress(endAngle){
      if(endAngle>=PA*2/3&&endAngle<PA){
        return  endAngle - 2/3*PA;
      }else if(endAngle<0&&endAngle>-PA){
        return  PA/3*4+endAngle;
      }else if(endAngle>=0&&endAngle<=PA/3){
        return  PA*4/3+endAngle;
      }
    };
   //进度转角度
    ProgressToAngle(Progress){
      if(Progress>=0&&Progress<=PA*4/3){
        return Progress+PA*2/3;
      }else if(Progress>PA*4/3&&Progress<=PA*5/3){
        return Progress-PA*4/3;
      }
    };
    //按下事件
    
    CanvasStart(e){
       e.preventDefault();
       if(this.enable){
         var message = this.CheckQuadrant(e);
        this.currentPaint(message.endAngle);
        this.ProgressEmit(message.endAngle,this.max,this.min);
       }
    };
    //移动事件
    CanvasMove(e){
       e.preventDefault();
       if(this.enable){
         var message = this.CheckQuadrant(e);
        this.currentPaint(message.endAngle)
        this.ProgressEmit(message.endAngle,this.max,this.min);
       }
    };
    //自身改变progress 抛出progress事件
    ProgressEmit(endAngle,max,min){
      var outProgress = this.SystemProgressToUser(endAngle,max,min);
       if(!isNaN(outProgress)){
          this.progress = Math.round(outProgress+parseInt(min));
          this.ProgressChange.emit(this.progress)
       }
    };
    //判断当前应该画多少度的
    currentPaint(endAngle){
          if(endAngle<0){
             endAngle=2*PA+endAngle;
          }
          if(endAngle>2/3*PA||endAngle<1/3*PA-0.01){
            var  canvas = this.clearCanvas(this.canvasId);
             this.Painting(canvas,0.5*PA,endAngle);
          }else if(endAngle<=2/3*PA&&endAngle>=2/3*PA-0.1){
            var  canvas = this.clearCanvas(this.canvasId);
             this.drawImage(canvas,this.behindImage);
          }else if(endAngle>=1/3*PA-0.01&&endAngle<1/3*PA+0.1){
            var  canvas = this.clearCanvas(this.canvasId);
             this.drawImage(canvas,this.FrontImage);
          }
    };
    //在canvas画半圆
    Painting(canvas:any,startAngle:number,endAngle:number){
        var ctx = canvas.getContext('2d');
        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1;
        var ratio = devicePixelRatio / backingStoreRatio;
        console.log(canvas.width)
        canvas.width = (this.Radius+2) * ratio*2;
        canvas.height= (this.Radius+2) * ratio*2;
        ctx.scale(ratio, ratio);
        ctx.fillStyle="red"
      //  ctx.translate(0.5, 0.5);
        if(this.behindImage){
          ctx.drawImage(this.behindImage,0,0,this.Radius*2,this.Radius*2);
        }
        ctx.save();
        ctx.beginPath();     
        ctx.arc(this.Radius,this.Radius,this.Radius,startAngle,endAngle,false);
        let x:number = Math.sin(endAngle-0.5*PA)*this. Radius;
        let y:number = Math.cos(endAngle-0.5*PA)*this.Radius; 
        ctx.moveTo(150-x, y+150);
        ctx.lineTo(this.Radius,this.Radius);
        ctx.lineTo(150,300);
        ctx.closePath();
        ctx.clip();
        if(this.FrontImage){
          ctx.drawImage(this.FrontImage,0,0,this.Radius*2,this.Radius*2);
        }
        ctx.restore();
      
    };
    drawImage(canvas:any,backImage:any){
      var ctx = canvas.getContext('2d');
      var devicePixelRatio = window.devicePixelRatio || 1;
      var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                      ctx.mozBackingStorePixelRatio ||
                      ctx.msBackingStorePixelRatio ||
                      ctx.oBackingStorePixelRatio ||
                      ctx.backingStorePixelRatio || 1;
      var ratio = devicePixelRatio / backingStoreRatio;
      canvas.width = (this.Radius+2) * ratio*2;
      canvas.height= (this.Radius+2) * ratio*2;
      ctx.scale(ratio, ratio);
      //ctx.translate(0.5, 0.5);
       if(backImage){
          ctx.drawImage(backImage,0,0,this.Radius*2,this.Radius*2);
        }
    }
    //获取角度
    CheckQuadrant(e){
       this.offsetLeft = getElementLeft(e.target);
       this.offsetTop = getElementTop(e.target);
       return {endAngle:Math.atan2(e.changedTouches[0].clientY-this.offsetTop-this.Radius,e.changedTouches[0].clientX-this.offsetLeft-this.Radius)}
    };
    //清除canvas画布
    clearCanvas(id:string){
        var canvas:any = document.getElementById(id);
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        return canvas;
    };
    IsCanvas(){
      if(document.getElementById(this.canvasId)!=null)
      {
        return true;
      }
       return false;
    }
}