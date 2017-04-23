import { Component,Input,Output,SimpleChange,OnChanges,AfterViewInit,EventEmitter} from '@angular/core';
import {getElementLeft,getElementTop} from './common';

var PA = Math.PI;

@Component({
  selector: 'Cancas-Page',
  templateUrl: 'CancasPage.html'
})

export class CancasPage  implements OnChanges,AfterViewInit{
    @Input() canvasId:string="mycanvas";    //绘制canvas的id唯一 默认 mycanvas
    @Input() progress:number=0;            //进度数值   默认 0
    @Input() max:number = 100;            //最大值  默认 100
    @Input() min:number =0;               //最小值  默认 0
    @Input() enable:boolean = true;     //是否不能使用 默认false不可以使用
    @Input() Radius:number = 150;
    @Output() IdChange = new EventEmitter<string>();    //canvasid改变抛出事件
    @Output() ProgressChange = new EventEmitter<number>();  //进度改变抛出事件
    @Output() enableChange = new EventEmitter<boolean>();   //能否使用抛出事件
    offsetLeft:number = 0;
    offsetTop:number = 0;
    canvas:any;
    constructor(){
      //  setTimeout(()=>{
      //    this.canvasId ="Changed";
      //   // this.IdChange.emit(this.canvasId);
      //  },5000)
    };
    ngAfterViewInit(){
      if(this.enable){
        this.currentPaint(this.UserProgressToSys(this.progress,this.max,this.min));
      }
      else{
        this.currentPaint(this.UserProgressToSys(this.max,this.max,this.min));
      }
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
      console.log(Progress)
      if(Progress>=0&&Progress<=PA/3){
        return Progress+PA*2/3;
      }else if(Progress>PA/3&&Progress<=PA/3*4){
        return Progress -PA/3*4;
      }else if(Progress>PA/3*4&&Progress<=PA/3*5){
        return Progress -PA/3*4;
      }
      return PA/3*4;
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
      console.log(endAngle)
       if(endAngle>=PA*2/3+0.02||endAngle<PA/3-0.02)
        {
          var  canvas = this.clearCanvas(this.canvasId);
          this.Painting(canvas,5/3,-endAngle/PA);
        }
        else if(endAngle>=PA/3-0.02&&endAngle<=PA/3+0.1){
          var  canvas = this.clearCanvas(this.canvasId);
        }
        else if(endAngle<=PA*2/3+0.02&&endAngle>=PA*2/3-0.1){
           
          var  canvas = this.clearCanvas(this.canvasId);
          this.Painting(canvas,5/3,4/3);
        }
    };
    //在canvas画半圆
    Painting(canvas:any,startAngle:number,endAngle:number){
       var ctx = canvas.getContext('2d');
       ctx.beginPath();
       ctx.strokeStyle ='rgb(197,197,197)';
       ctx.lineWidth = 14.5;
       ctx.lineCap = "square";
       ctx.arc(152,152,143.5,-PA*startAngle,-PA*endAngle,true);
       ctx.stroke();
    };
    //获取角度
    CheckQuadrant(e){
       this.offsetLeft = getElementLeft(e.target);
       this.offsetTop = getElementTop(e.target);
       return {endAngle:Math.atan2(e.changedTouches[0].clientY-this.offsetTop-150,e.changedTouches[0].clientX-this.offsetLeft-150)}
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