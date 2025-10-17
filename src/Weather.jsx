import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      toast.error("Please enter a city name!");
      setError("Please enter a city name!");
      return;
    }

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 404) {
          setData(null);
          setError("City not found. Please try again !");
          toast.error("🚫 Enter a valid CITY NAME");
          return;
        }
        throw new Error("Something went wrong");
      }

      const result = await res.json();
      setData(result);
      setCity("");
      setError("");
      toast.success(`✅ Weather fetched for ${result.name}`);
    } catch (err) {
      console.error(err);
      setData(null);
      setError("Unable to fetch weather data. Try again later!");
      toast.error("Network or API error 😔");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center relative">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-xl font-semibold mb-4 text-blue-700">Weather App</h2>

      <input
        type="text"
        className="border px-3 py-2 w-full rounded-md mb-3"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={getWeather}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
      >
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {data && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {data.name}, {data.sys.country}
          </h3>
          <p>🌡️ Temp: {data.main.temp}°C</p>
          <p>☁️ Weather: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
