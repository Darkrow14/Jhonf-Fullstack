import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Persons, PersonForm, Filter} from './components/Persons.js'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [loading, setLoading ] = useState(true)


  const addPerson = (event) =>{
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      alert(newName + ' is already added to phonebook')
    }else{
      const person = {
        id:persons.length+1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  const changeName = (event) => setNewName(event.target.value)

  const changeNumber = (event) => setNewNumber(event.target.value)

  const changeFilter = (event) => setFilter(event.target.value)

  const personsToShow = !filter ? persons :
  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const hook = () => {
    axios.get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
    setLoading(false)
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} changeValue={changeFilter}/>
      <h2>Add a new person</h2>
      <PersonForm 
            name={newName} 
            number={newNumber} 
            changeNumber={changeNumber} 
            changeName={changeName} 
            add={addPerson}/>
      <h2>Numbers</h2>
      {loading? 'loading...':<Persons persons={personsToShow}/>}
    </div>
  )
}

export default App
