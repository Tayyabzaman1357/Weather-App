async function getweather() {
    let city = document.getElementById("input-box").value.trim()

  if (!city) {
    alert("Please enter a city name");
    return;
  }

fetch(`http://api.weatherapi.com/v1/current.json?key=371edda406cd4eb79f570425252107&q=${city}&aqi=yes`)
  .then(response => response.json())
  .then(data => {
let app = document.getElementById("all-text")
app.innerHTML = ''
app.innerHTML +=`
<h1>🌤️ "Weather in": ${data.location.name}</h1> 
<span>🌍 "Country":${data.location.country} </span> <br><br>
<span>🌡️ "Temperature (C)":   ${data.current.temp_c}</span> <br><br>
<span>🌥️ "Condition": ${data.current.condition.text}</span> <br><br>
`
 document.getElementById("input-box").value = "";
  })
  .catch(error => {
    console.log(" Error:", error);
  });

    
}

