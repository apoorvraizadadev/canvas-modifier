import { useState } from 'react'
import './App.css'
import ColorModifier from './ColorModifier'

function App() {
  const properties = [
    { name: "Background color",  variable: "--background-color"}, 
    { name: "Sidebar background color",  variable: "--sidebar-background-color"},
    { name: "Body text color",  variable: "--body-text-color"},
    { name: "Link text color",  variable: "--link-text-color"},
  ]

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