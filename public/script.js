document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) return alert("Enter a city name");

  try {
    const res = await fetch(`/api/weather?city=${city}`);
    if (!res.ok) return (document.getElementById("result").innerHTML = "<p>City not found!</p>");
    const data = await res.json();

    document.getElementById("result").innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
    `;
  } catch {
    document.getElementById("result").innerHTML = "<p>Something went wrong!</p>";
  }
}
