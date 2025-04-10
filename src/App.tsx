import { useEffect, useState } from 'react';
import './App.css'

type WeatherData = {
  clouds: {
    all: number;
  };
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
  }[];
  name: string;
};



function App() {
  // const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState<WeatherData | null>(null);
  const [search, searchData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])
  console.log(search);


  return (
    <>
      <div className="container">
        <div className="search-box">
          <i className="fa-solid fa-location-dot"></i>
          <input
            value={search}
            onChange={(e) => searchData(e.target.value)}
            type="text"
            placeholder='Bandung' />

          <button
            onClick={() => console.log('clicked')}
            className="fa-solid fa-magnifying-glass"></button>
        </div>

        {!data && (
          <div className="not-found">
            <h2>Location not found</h2>
          </div>
        )}



        {data &&
          <><div className="weather-box">
            <img src="../src/assets/img/awan2.webp" />
            <p className='temperature'>{Math.round(data.main.temp - 273.15)} <span>°C</span></p>
            <p className='description'>{data.weather[0].description}</p>
          </div>

            <div className="weather-details">
              <div className="humadity">
                <i className="fa-solid fa-water"></i>
                <span>Humidity</span>
                <p>82%</p>
              </div>
              <div className="wind">
                <i className="fa-solid fa-wind"></i>
                <span>Wind Speed</span>
                <p>1.5 km/h</p>
              </div>
            </div></>
        }

      </div>
    </>
  )
}

export default App
