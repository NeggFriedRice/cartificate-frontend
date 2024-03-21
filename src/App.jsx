/* eslint react/forbid-prop-types: 0 */

import { useEffect, useState } from 'react'
import UpdateForm from './components/UpdateForm'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import ShowUpdate from './components/ShowUpdate'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SingleUpdate from './components/SingleUpdate'


function App() {

  const [updates, setUpdates] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_API_URL+'/updates')
      .then(data => data.json())
      .then(updates => setUpdates(updates))
    }, [])


  async function deleteUpdate(id) {

    let toDeleteUpdateId = null

    await fetch(import.meta.env.VITE_BACKEND_API_URL+`/updates/${id}`)
    .then(data => data.json())
    .then(response => toDeleteUpdateId = response._id)
    
    console.log(toDeleteUpdateId)

    await fetch(`http://localhost:4002/updates/${toDeleteUpdateId}`, {method: 'DELETE'})
  }

  // Add new upate to database
  async function addUpdate(content) {
    const newId = updates.length
    const user = JSON.parse(sessionStorage.getItem('user'))
    // Create new entry object from content data
    const newUpdate = {
      activity: content.activity,
      date: content.date,
      cost: content.cost,
      notes: content.notes,
      createdBy: user
    }
    
    // Send post request to server
    const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+'/updates/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUpdate)
    })
    const data = await response.json()
    console.log(JSON.stringify(newUpdate))
    console.log(data)

    setUpdates([...updates, data])
    return newId
  }

  const UpdateWrapper = ({deleteUpdate}) => {
    const { id } = useParams()
    return <SingleUpdate id={id} deleteUpdate={deleteUpdate} updates={updates} setUpdates={setUpdates}/>
  }


  return (
    <>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<ShowUpdate updates={updates}/>}></Route>
          <Route path="/updates/new" element={<UpdateForm setUpdates={setUpdates} updates={updates} addUpdate={addUpdate}/>}></Route>
          <Route path='/updates/:id' element={<UpdateWrapper deleteUpdate={deleteUpdate}/>} />
          <Route path='/login' element={<Login setUser={ setUser }/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
