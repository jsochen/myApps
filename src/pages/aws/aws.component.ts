import { Component, OnInit } from '@angular/core';

// import entire SDK
// import *  as AWS from'aws-sdk';

// console.log(AWS);

// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:880aeabe-0a08-4c54-ace7-dc9fef49f3dd',
// });

// console.log(AWS.config.credentials)

 //AWS.config.credentials.get(function(){

//   //  var syncClient = new AWS.CognitoSyncManager();
//    //console.log(syncClient)
//   //  syncClient.openOrCreateDataset('myDataset', function(err, dataset) {

//   //     dataset.put('myKey', 'myValue', function(err, record){

//   //        dataset.synchronize({

//   //           onSuccess: function(data, newRecords) {
//   //               // Your handler code here
//   //               console.log(data);
//   //               console.log(newRecords)
//   //           }

//   //        });

//   //     });

//   //  });

 // });
@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
})
export class AwsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  }

}