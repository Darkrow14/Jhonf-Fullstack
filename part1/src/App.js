
import './App.css'

const Information = (props) => {
  return (
    <div>
      <p>Hello i am {props.name} and {props.age} old.</p>
    </div>
  )
}
function App () {
  const name = 'Jhonatan'
  const nuevo = 3
  const age = 34
  return (
    <div className="App">
      <Information name='Juliana' age='34'/>
      <Information name={name} age={age} />
      <p>{nuevo}</p>
    </div>
  )
}

export default App
