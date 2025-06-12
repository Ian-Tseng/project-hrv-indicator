import { me as companion } from "companion";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase,ref, set, child, get  } from "firebase/database";
import * as messaging from "messaging";


if (!companion.permissions.granted("access_internet")) {
  console.log("We're not allowed to access the internet!");
}
var state= 0;
var heart_rate_change= [];
const url= 'https://3f75-114-40-19-101.ngrok-free.app';
var subscribe_url =url+'/subscribe';
var unsubscribe_url= url+'/unsubscribe';
var publish_url =url+'/publish';
const uid= 'abc'


messaging.peerSocket.addEventListener("message", (evt) => {
 //console.error(JSON.stringify(evt.data));
  console.log(`Received data: ${JSON.stringify(evt.data)}`);
 
  if (evt.data["title"]== "control_device"){
    state= evt.data["data"];
    fetch_data_control(evt.data["data"]);
    return;

  } 
  if (evt.data["title"]== "heart_rate_data" && state!=0){
    fetch_data_upload_data(evt);
    return;
  } 

});

async function fetch_data_upload_data(evt) {
   // var high_heart_rate= 126; //126
   // var low_heart_rate=50; //50
    //var gain=100;
   // var effect_by_random= Math.random() * (1 - 0.5) + 0.5;
    //const bio_data= (parseFloat(target_data)-low_heart_rate)/(high_heart_rate-low_heart_rate)*gain;

   // heart_rate_change.splice(0, 0, target_data);
   // if (heart_rate_change.length>3){
   //     heart_rate_change.pop()
   // }
   // var dimmingSetting=  Math.round((Math.abs((heart_rate_change.at(0)-heart_rate_change.at(1)))/(high_heart_rate-low_heart_rate)+Math.abs((heart_rate_change.at(1)-heart_rate_change.at(2)))/(high_heart_rate-low_heart_rate))*100);


   // if (dimmingSetting<0){
   //     dimmingSetting=0;
   // } else if (dimmingSetting>100){
   //     dimmingSetting=100;
   // }
   // console.log(`Converted heart rate data to dimming: ${dimmingSetting}`)
    // Set headers
    const headers=new Headers({
        "Content-Type": "application/json",
    });
    // Set data 
    var data= {
        'topic':evt.data["title"],
        'heart_rate_data': evt.data["data"],
        'uid':uid,
        'for_event':'hrv_displayer_event',
    }
   
    let fetch_init = {method:'POST', headers: headers, body:JSON.stringify(data), mode: "cors"}
   
    const response = await fetch(publish_url, fetch_init)

    console.log(response.status);


}

async function fetch_data_control(target_data) {
   // var dimmingSetting=0;
   // if (target_data!=0){
   //     dimmingSetting=100;
   // }

    
    const headers=new Headers({
        "Content-Type": "application/json",

    });

    
 //   var data= {
      //  'dimmingSetting': dimmingSetting,
 //       'state': target_data
 //   }
    var data= {
        'uid':uid,
        'topic':'hrv_displayer_event',
        'subscribe_data_topic': 'heart_rate_data',
    }
    let fetch_init = {method:'POST', headers: headers, body:JSON.stringify(data), mode: "cors"}

    if (target_data== 1) {

        const response = await fetch(subscribe_url, fetch_init)
        console.log(response.status);

    } else {
        const response = await fetch(unsubscribe_url, fetch_init)

        console.log(response.status);
    }
   
   
}



