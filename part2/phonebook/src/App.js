import React, { useState, useEffect } from 'react'
import {Persons, PersonForm, Filter} from './components/Form.js'
import {getPersons, createPerson, deletePerson, updatePerson} from './services/persons.js'


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
      const person = persons.find(p => p.name === newName)
      const personChanged = {...person, number:newNumber}
      const result = window.confirm(`${newName} is already added to phonebook, replace the olnumber with a new one?`)
      if (result){
        updatePerson(person.id, personChanged)
        .then(data => setPersons(persons.map(p => p.name !== newName ? p: data)))
      }
    }else{
      const person = {
        id:persons.length+1,
        name: newName,
        number: newNumber
      }
      createPerson(person)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const delPerson = (id) => {
    const person = persons.find(p => p.id === id)
    const result = window.confirm(`Delete ${person.name}?`)
    if (result){
      deletePerson(id)
      .then((data) => {
        setPersons(data)
      })
    }
  }
  const changeName = (event) => setNewName(event.target.value)

  const changeNumber = (event) => setNewNumber(event.target.value)

  const changeFilter = (event) => setFilter(event.target.value)

  const personsToShow = !filter ? persons :
  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const hookGet = () => {
    getPersons()
    .then((data) => {
      setPersons(data)
    })
    setLoading(false)
  }

  useEffect(hookGet, [])

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
            add={addPerson}
            />
      <h2>Numbers</h2>
      {loading? 'loading...':<Persons persons={personsToShow} del = {delPerson}/>}
    </div>
  )
}

export default App
