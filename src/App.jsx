import { useState } from 'react'
import { useEffect } from "react"

import Header from './Components/header'
import NavBar from './Components/navBar'
import Card from './Components/card'
import List from './Components/list'

import './App.css'

function App() {

  const [value, setValue] = useState(10);
  const [searchText, setSearchText] = useState('');

  return (
    <div id="grid">
      <div className='container'>
        <Card setValue={setValue} setSearchText={setSearchText} searchText={searchText}/>
        <List value={value} searchText={searchText}/>
      </div>
    </div>
  )
}

export default App
