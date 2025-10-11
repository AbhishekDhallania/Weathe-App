const backendUrl = "https://weathe-app-8vc9.onrender.com"

document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("Enter a city name");

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${backendUrl}/api/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();

    if (res.ok) {
      resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = "<p>Something went wrong!</p>";
  }
}
