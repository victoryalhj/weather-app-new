import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';


// 1.현재기온보여짐
// 2.도시,섭씨,화씨,정보
// 3.5개버튼
// 4.클릭할떄 도시별버튼
// 5.현재위치버튼 
// 6.로딩스피너

function App() {
  const [weather, setWeather]=useState(null);
  const [city,setCity]=useState("");
  const cities = ['current location','paris','new york','tokyo','seoul'];
  
  const getCurrentLocation= useCallback(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)});
  },[]);

  const getWeatherByCurrentLocation = async (lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=faa38f17e7999e9f8f3778867a829169&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  const getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=faa38f17e7999e9f8f3778867a829169&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  }


  useEffect(()=>{
    if(city===""){
      getCurrentLocation();
    }else {
      getWeatherByCity();
    }
  },[city]);



  return (
  <div>
    <div className="container">
     <WeatherBox weather={weather} />
     <WeatherButton cities={cities} setCity={setCity}/>
    </div>
  </div>
  );
};

export default App;
