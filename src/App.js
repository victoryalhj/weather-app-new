import { useEffect,useState,useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const cities = ["paris","new york", "tokyo","seoul"];
// const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [weather,setWeather]=useState(null);
  const [city,setCity]=useState('');
  const [loading,setLoading]=useState(false);
  const [apiError,setAPIError] = useState("");

  const getWeatherByCurrentLocation = async(lat,lon) => {
    try{
      let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=faa38f17e7999e9f8f3778867a829169&units=metric`
      let response = await fetch(url);
       let data = await response.json();
       setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getCurrentLocation=useCallback(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude: lat, longitude: lon} = position.coords;
      getWeatherByCurrentLocation(lat,lon);
    },
    // (error) => {
    //   setAPIError(error,message);
    //   setLoading(false);
    // }
  );
  },[]);

  const getWeatherByCity = async () => {
    if (!city) return; // 빈 문자열인 경우 처리
    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=faa38f17e7999e9f8f3778867a829169&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setAPIError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setLoading(true);
    if(city==="current"){
      getCurrentLocation();
    }else {
      getWeatherByCity()
    }
  },[city,getCurrentLocation]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("current")
      getCurrentLocation();
    } else {
      setCity(city);
    }
  };

  return (
    <div>
      {loading? (
        <div className="container">
        <ClipLoader color="#f88c6b" loading={loading} size={150} /> 
        </div>
      ) : (
      <div className="container">
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} selectedCity={city} handleCityChange={handleCityChange} />
      </div>
      )}
    </div>
  );
}

export default App;
