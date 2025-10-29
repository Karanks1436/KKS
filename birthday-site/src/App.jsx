// import { useState } from 'react'

// import './App.css'
// import Birthday from './Birthday'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Birthday/>
//     </>
//   )
// }

// export default App



import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Birthday from './Birthday'
import Friend from './Friend'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="KKS/" element={<Birthday />} />
        <Route path="KKS/friend/" element={<Friend />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
