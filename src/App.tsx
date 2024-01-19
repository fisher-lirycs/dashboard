import React, { useEffect, useState } from 'react';
import { WeatherType } from './types/Types';
import axios from 'axios';
import 'react-clock/dist/Clock.css';
import { Link } from 'react-router-dom';
function App() {
  const [weather, setWeather] = useState<WeatherType>();
  useEffect(() => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=35.558751&lon=139.715263&units=metric&appid=2d6f72fd863d8dbb934d557c5009e646").then(({ data }) => {
      setWeather(data);
    })
  }, []);
  return (
    <div>
      <ul>
        <li>
          <Link to="/dashBoard01" >DashBoard01</Link>
        </li>
        <li>
          <Link to="/dashBoard02">DashBoard02</Link>
        </li>
      </ul>
    </div >
  );
}

export default App;
