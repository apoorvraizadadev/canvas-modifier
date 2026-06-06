import { useState } from 'react'
import './App.css'
import ColorModifier from './ColorModifier'

function App() {
  const properties = [{ name: "Text",  variable: "--main-text-color"}]

  return (
    <>
      {
        properties.map((prop) => (
          <ColorModifier property={prop}/>
        ))
      }
    </>
  )
}

export default App