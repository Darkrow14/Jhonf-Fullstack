import React from 'react'

export const Filter = ({value, changeValue}) => {
    return(
      <form>
        <div>
          filter show with:
          <input onChange={changeValue} value={value}/>
        </div>
      </form>
    )
}


  
export const PersonForm = (props) => {
    const {name, number, changeNumber, changeName, add} = props
    
    return (
        <form onSubmit={add}>
        <div>
            name:<input onChange={changeName} value={name}/>
        </div>
        <div>
            number:<input onChange={changeNumber} value={number} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

const Button = ({id,del}) => {
    return <button onClick={() => del(id)}>delete</button>
}
export const Persons = ({persons, del}) => {
    return (
        <div>
            {persons.map(person =>
            <div key={person.id}>
                {person.name} {person.number}<Button id={person.id} del={del}/>
            </div>
            )}
        </div>
    )
}
