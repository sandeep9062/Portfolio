import { useState } from 'react'
import Navbar from './components/Navbar'
import Center from './components/Center'
import { createBrowserRouter } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     
     <Center/>
     

     









    </>
  )
}

export default App