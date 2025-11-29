const API_KEY = "371edda406cd4eb79f570425252107";

window.onload = () => getLocationWeather();

function getLocationWeather() {
  showLoading();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
      () => showError("Location access denied. Search a city manually.")
    );
  } else {
    showError("Geolocation not supported.");
  }
}

async function searchCity() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) return alert("City name likho bhai!");
  showLoading();
  await fetchWeather(city);
  document.getElementById("city-input").value = "";
}

async function fetchWeather(query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "City not found!");

    // Yeh line sabse important hai – icon ko direct working path se load karo
    const iconCode = data.current.condition.icon.split("/").pop(); // e.g., 116.png
    const isDay = data.current.is_day === 1 ? "day" : "night";
    const iconUrl = `https://cdn.weatherapi.com/weather/64x64/${isDay}/${iconCode}`;

    // Update all data
    document.getElementById("city-name").textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temperature").innerHTML = `${data.current.temp_c}<sup>°C</sup>`;
    document.getElementById("condition").textContent = data.current.condition.text;
    document.getElementById("weather-icon").src = iconUrl;
    document.getElementById("feels-like").textContent = data.current.feelslike_c;
    document.getElementById("humidity").textContent = data.current.humidity;
    document.getElementById("wind").textContent = data.current.wind_kph;
    document.getElementById("pressure").textContent = data.current.pressure_mb;
    document.getElementById("date-time").textContent = new Date(data.location.localtime).toLocaleString();

    hideLoading();
    document.getElementById("weather-info").classList.remove("hidden");

  } catch (err) {
    hideLoading();
    showError(err.message);
  }
}

function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("error").classList.add("hidden");
  document.getElementById("weather-info").classList.add("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

function showError(msg) {
  hideLoading();
  document.getElementById("error").textContent = msg;
  document.getElementById("error").classList.remove("hidden");
}

// Enter key support
document.getElementById("city-input").addEventListener("keypress", e => {
  if (e.key === "Enter") searchCity();
});
