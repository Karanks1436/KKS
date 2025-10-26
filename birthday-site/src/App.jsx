import { useState } from 'react'

import './App.css'
import Birthday from './Birthday'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Birthday/>
    </>
  )
}

export default App
