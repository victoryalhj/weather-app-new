import React from 'react'

const WeatherBox = ({ weather, loading }) => {
  // 로딩 중일 때 메시지 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  // 데이터가 없거나 필요한 데이터가 부족할 때
  if (!weather || !weather.main || !weather.weather || weather.weather.length === 0) {
    return <div>No data available</div>;
  }

  // 데이터가 있는 경우
  const { name } = weather;
  const { temp } = weather.main;
  const description = weather.weather[0].description;

  const tempFahrenheit = (temp * 9/5) + 32;

  return (
    <div className="weather-box">
      <div>{name}</div>
      <h2>{temp}°C / {tempFahrenheit.toFixed(1)}°F</h2>
      <h3>{description}</h3>
    </div>
  );
};


export default WeatherBox
