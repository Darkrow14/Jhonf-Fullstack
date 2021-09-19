import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) =>{
  const {name, exercises} = props
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = (props) =>{
  const {parts, exercises} = props
  return (
    <div>
      <Part name={parts[0]} exercises={exercises[0]}/>
      <Part name={parts[1]} exercises={exercises[1]}/>
      <Part name={parts[2]} exercises={exercises[2]}/>
    </div>
  )
}

const Total = (props) =>{
  const suma = props.exercises.reduce((a, b) => a + b, 0)
  return (
    <p>Number of courses {suma}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))