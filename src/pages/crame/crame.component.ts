import { Component, OnInit } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'app-crame',
  templateUrl: './crame.component.html'
})
export class CrameComponent implements OnInit {
  // options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
 // constructor(private camera: Camera) { }

  ngOnInit() {
  }
  
  Cramefun(){
      //   this.camera.getPicture(this.options).then((imageData) => {
      // // imageData is either a base64 encoded string or a file URI
      // // If it's base64:
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      // }, (err) => {
      // // Handle error
      // });
      // alert(0);
  }
}