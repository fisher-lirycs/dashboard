import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/01';
import { Weather } from './types/Types';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState<Weather>();
  const [screenH, setScreenH] = useState<number>(0);
  useEffect(() => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=35.558751&lon=139.715263&appid=2d6f72fd863d8dbb934d557c5009e646").then(({ data }) => {
      setWeather(data);
    })
  }, []);

  useEffect(() => {
    setScreenH(window.innerHeight)
  }, [])
  return (
    <div>
      <Dashboard weather={weather} screenH={screenH} />
    </div>
  );
}

export default App;
