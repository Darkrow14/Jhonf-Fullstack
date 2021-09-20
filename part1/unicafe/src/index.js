import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({content}) => <h1>{content}</h1>

const Button = ({text, handleOnClick}) =>(
  <button onClick={handleOnClick}>{text}</button>
)

const Statistic = ({text, value}) =><p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) =>{
  const all = good + neutral + bad
  if (all === 0){
    return <p>No feedback given</p>
  }

  const average = (good - bad) / all
  const positive = String((good/all)*100)+'%'
  return (
    <div>
      <Statistic text={'good'} value={good} />
      <Statistic text={'neutral'} value={neutral} />
      <Statistic text={'bad'} value={bad} />
      <Statistic text={'all'} value={all} />
      <Statistic text={'average'} value={average} />
      <Statistic text={'positive'} value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title content='give feedback'/>
      <Button handleOnClick={() => setGood(good+1)} text='good'/>
      <Button handleOnClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button handleOnClick={() => setBad(bad+1)} text='bad'/>
      <Title content='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)