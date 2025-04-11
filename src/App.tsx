import { useEffect, useState } from 'react';
import './App.css'
import { useDebounce } from '@uidotdev/usehooks';

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
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState<WeatherData | null>(null);
  const [search, searchData] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const [debouncedValue] = useDebounce(search, 2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      }
    };

    fetchData();
  }, [debouncedValue])
  console.log(search);


  return (
    <>
      <div className="container" style={{ height: !data ? '400px' : 'auto' }}>
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
          <div className="not-found" style={{ animation: ' 0.5s ease-in-out forwards' }}>
            <img src="../src/assets/img/404.webp" />
            <h2>Location not found 😢</h2>
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
                <p>{data.main.humidity}%</p>
              </div>
              <div className="wind">
                <i className="fa-solid fa-wind"></i>
                <span>Wind Speed</span>
                <p>{data.wind.speed} km/h</p>
              </div>
            </div></>
        }

      </div>
    </>
  )
}

export default App
