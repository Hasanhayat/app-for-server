import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `https://express-js-server-one.vercel.app/api/${city}`;
      const res = await axios.get(url);
      console.log(res.data);
      setData(res.data);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("City not found in database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchWeather();
  }, []); // Initial fetch

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6`}
    >
      <main className="w-full max-w-md flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold">🌤️ Weather App</h1>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Get Weather
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {data && data.status === "success" && (
          <div className="bg-gray-800 p-4 rounded shadow-lg w-full">
            <h2 className="text-xl font-semibold mb-2">{data.message}</h2>
            <ul className="space-y-1">
              <li>🌡️ Temperature: {data.data.temperature}°C</li>
              <li>💧 Humidity: {data.data.humidity}%</li>
              <li>💨 Wind: {data.data.wind}</li>
              <li>🔻 Min: {data.data.min}°C</li>
              <li>🔺 Max: {data.data.max}°C</li>
              <li>🔥 Feels Like: {data.data.feelslike}°C</li>
            </ul>
          </div>
        )}
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        Powered by Express API
      </footer>
    </div>
  );
}
