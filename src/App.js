import { useEffect,useState } from 'react';
import './App.css';

function App() {

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
    });
  };

  const getWeatherByCurrentLocation = async(lat,lon) => {
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=faa38f17e7999e9f8f3778867a829169`
    let response = await fetch(url);
    let data = await response.json();
    console.log("data",data);
  };

  useEffect(()=>{
    getCurrentLocation();
  },[]);

  return (

    <div>hiiii</div>
  );
}

export default App;
