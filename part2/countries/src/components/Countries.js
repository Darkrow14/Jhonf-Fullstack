import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Weather from './Weather.js'

const API_KEY_WEATHER =process.env.REACT_APP_API_KEY_WEATHER

const Language = ({lang}) => {
    return(
      <li>
        {lang.name}
      </li>
    )
}
const Country = ({country}) => {
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

export default Countries