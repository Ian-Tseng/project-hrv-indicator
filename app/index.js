import { BodyPresenceSensor } from "body-presence";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
// Import the functions you need from the SDKs you need

import * as messaging from "messaging";

import clock from "clock";
import * as document from "document";


appbit.appTimeoutEnabled=false;
messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Ready to send or receive messages");

});
// Interface elements
const statsCyle = document.getElementById("statsCyle");
const items = statsCyle.getElementsByClassName("cycle-item");
statsCyle.value = 2;
const heart_rate_item= document.getElementById("text-item-1");

// Variables
var state= 0;
const hrm= null;
if (HeartRateSensor || hrm==null) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    console.log(`Current heart rate: ${hrm.heartRate}`);
    heart_rate_item.text=`HR: ${hrm.heartRate}`;

    if (state!=0){
      const data = {
        title: 'heart_rate_data',
        data: hrm.heartRate
      }
      
      sendMessage(data);
    }
  });
  hrm.start();


  
} else {
  console.log(`Did not detect heart rate sensor.`);

}
//if (BodyPresenceSensor && hrm) {
//    const body = new BodyPresenceSensor();
//    body.addEventListener("reading", () => {
//    if (!body.present) {
//      hrm.stop();
//    } else {
//      hrm.start();
//    }
//  });
//  body.start();
//}


function sendMessage(target_data) {

  
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
       
        messaging.peerSocket.send(target_data);

   
  } else {
      console.log("In error");
      messaging.peerSocket.addEventListener("open", (evt) => {
      console.log("Ready to send or receive messages");

      });
      

  
  }
}

const control_button = document.getElementById("button-1");
control_button.addEventListener("click", (evt) => {

  if (state==1){
    state=0;
    const data = {
        title: 'control_device',
        data: state
    }
    control_button.text="START";
    sendMessage(data);

    return;
  } else {
    state=1;
    const data = {
        title: 'control_device',
        data: state
    }
    control_button.text="END";
    sendMessage(data);

    return;
  }
})

