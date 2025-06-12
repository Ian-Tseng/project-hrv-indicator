
import fetch from 'node-fetch'


async function fetch_data_control() {
   
 


    fetch("http://192.168.50.118:5000/led-dim", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        dimmingSetting: 25,
        state: 1
    })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
     }
     return response.json();
    })
        .then(data => {
        console.log("✅ POST Success:", JSON.stringify(data));
    })
    .catch(error => {
        console.error("❌ Fetch Error:", error);
    });


   



}
setInterval(fetch_data_control,1000)

