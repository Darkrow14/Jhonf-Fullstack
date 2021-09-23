import React, {useState, useEffect} from 'react';
import axios from 'axios';

const API_KEY_WEATHER =process.env.REACT_APP_API_KEY_WEATHER

const Filter = ({value, onChange={}}) => {
  return(
    <form>
      find countries:
      <input value={value} onChange={onChange}/>
    </form>
  )
}

const Language = ({lang}) => {
  return(
    <li>
      {lang.name}
    </li>
  )
}

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

const Country = ({country}) => {
  console.log(country)
  const {name, capital, population, languages, flags} = country
  const [weather, setWeather] = useState({})
  const [capi, setCapi] = useState(capital)
  const [loading, setLoading] = useState(true)

  const hookWeather = () =>{
    axios.get(
      'http://api.weatherstack.com/current?access_key='+API_KEY_WEATHER+'&query='+capi
      )
      .then(response =>{
        setWeather(response.data);
        setLoading(false)
      })
  }
  
  useEffect(hookWeather, [capi])
  return(
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(language => 
          <Language key={language.name} lang={language}/>)}
      </ul>
      <img src={flags[0]} width="130px" height="" alt={'flag of '+name}></img>
      {loading?'loading....':<Weather weather={weather}/>}
    </div>
  )
}

const ShowDetails = ({country}) => {
  const [show, setShow] = useState(false)
  return(
    <div>
      {country.name}
      <button onClick={() => setShow(!show)}>{!show? 'show':'hide'}</button>
      {show? <Country key={country.name}country={country}/>: ''}
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length === 0){
    return <p>Input any filter</p>
  }
  if (countries.length === 1){
    return(
      <div>
        {countries.map(country => 
        <Country key={country.name} country={country}/>)}
      </div>
    ) 
  }

  if (countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  
  return(
    <div>
      {countries.map(country => 
        <ShowDetails key={country.name} country={country}/>)}
    </div>
  )
}
function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const filterChange = (event) => setFilter(event.target.value)

  const hook = () => {
    axios.get('https://restcountries.com/v2/all')
    .then((response) => {
     setCountries(response.data)
    })
    setLoading(false)
  }
  
  useEffect(hook, [])

  const showCountries = !filter ? 
    []: 
    countries.filter(country => 
      country.name.toLowerCase().includes(filter.toLowerCase()) )


  return (
    <div>
      <Filter value={filter} onChange={filterChange} />
      {loading ? 
        'loading...': 
        <Countries countries={showCountries}/>}
    </div>
  );
}

export default App;
