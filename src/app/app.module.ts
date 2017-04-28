import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {HeroFormComponent} from '../pages/Hero/hero-form.component';
import {CrameComponent} from '../pages/crame/crame.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera} from '@ionic-native/camera';
import {CancasPage} from '../pages/CancasPage/CancasPage';
import {CanvasComponent} from '../pages/canvas/canvas.component';
import{AwsComponent} from '../pages//aws/aws.component';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    HeroFormComponent,
    CancasPage,
    CrameComponent,
    CanvasComponent,
    AwsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HeroFormComponent,
    CancasPage,
    CrameComponent,
    CanvasComponent,
    AwsComponent
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
