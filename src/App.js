import { useEffect,useState } from 'react';
import './App.css';

function App() {

  const getCurrentLocation=()=>{
    console.log("getCurrentLocation");
  };
  useEffect(()=>{
    getCurrentLocation();
  },[])

  return (

    <div>hiiii</div>
  );
}

export default App;
