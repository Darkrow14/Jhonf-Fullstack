import React, { useState } from 'react'
import {Persons, PersonForm, Filter} from './components/Persons.js'
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  const addPerson = (event) =>{
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      alert(newName + ' is already added to phonebook')
    }else{
      const person = {
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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
