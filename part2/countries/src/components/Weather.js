import React from 'react'

const Weather = ({weather}) => {
    console.log(weather)
    if (!weather.location){
      return <p>No weather data available</p>
    }
    const {location, current} = weather
    const {name} = location
    const {temperature, weather_icons, wind_speed, wind_dir} = current
    return(
      <div>
        <h2>Weather in {name}</h2>
        <p><b>temperature:</b> {temperature} celsius</p>
        <img src={weather_icons[0]} width="100px" height="" alt="" ></img>
        <p><b>wind:</b>{wind_speed} mph direction {wind_dir}</p>
      </div>
    )
}

export default Weather