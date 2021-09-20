import React from 'react'
const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const exercises = parts.map((part) => part.exercises)
    const sum = exercises.reduce((a, b) => a + b, 0)
    return(
      <b> Number of exercises {sum}</b>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(
          part => (
          <Part key={part.id} part={part}/>
          ))}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course