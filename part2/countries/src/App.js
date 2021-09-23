import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Countries from './components/Countries.js'

const Filter = ({value, onChange={}}) => {
  return(
    <form>
      find countries:
      <input value={value} onChange={onChange}/>
    </form>
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
