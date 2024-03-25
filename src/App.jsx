/* eslint react/forbid-prop-types: 0 */

import { useEffect, useState } from 'react'
import UpdateForm from './components/UpdateForm'
import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom'
import ShowUpdate from './components/ShowUpdate'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SingleUpdate from './components/SingleUpdate'
import Register from './components/Register'
import EditForm from './components/EditForm'
import { AnimatePresence } from 'framer-motion'


function App() {

  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [filtered, setFiltered] = useState(null)

  async function getUpdates() {
    await fetch(import.meta.env.VITE_BACKEND_API_URL+'/updates')
    .then(data => data.json())
    .then(updates => filterUpdates(updates))
  }

  function getUser() {
    const user = sessionStorage.getItem('user')
    setUser(user)
  }

  const userObject = JSON.parse(user)

  function filterByUser(update) {
    if (update.createdBy == userObject._id) {
      return true
    }
  }

  async function filterUpdates(updates) {
    try {
      const filteredUpdates = updates.filter(filterByUser)
      setFiltered(filteredUpdates)
    } catch (err) {
      setFiltered(false)
    }
  }

  useEffect(() => {
      getUpdates()
      getUser()
    }, [deleted, edited, user])

  async function deleteUpdate(id) {
    let toDeleteUpdateId = null

    await fetch(import.meta.env.VITE_BACKEND_API_URL+`/updates/${id}`)
    .then(data => data.json())
    .then(response => toDeleteUpdateId = response._id)

    const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+`/updates/${toDeleteUpdateId}`, {method: 'DELETE'})
    if(response.status == 204) {
      setDeleted(previousState => !previousState)
    }
    else {
      alert("Couldn't delete update")
    }
  }

  // Add new upate to database
  async function addUpdate(content) {
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
    try {
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
    getUpdates()
    } catch (err) {
      console.log(err)
    }
  }

  const UpdateWrapper = ({deleteUpdate}) => {
    const { id } = useParams()
    return <SingleUpdate id={id} deleteUpdate={deleteUpdate} user={user}/>
  }

  const EditWrapper = () => {
    const { id } = useParams()
    return <EditForm id={id} setEdited={setEdited} />
  }

  return (
    <>
      <NavBar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} getUpdates={getUpdates}/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path='/' key="showUpdate" element={<ShowUpdate user={user} filtered={filtered}/>}></Route>
          <Route path="/updates/new" element={<UpdateForm addUpdate={addUpdate}/>}></Route>
          <Route path='/updates/:id' element={<UpdateWrapper deleteUpdate={deleteUpdate}/>} />
          <Route path='/updates/edit/:id' element={<EditWrapper />} />
          <Route path='/login' key="logIn" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AnimatePresence>  
    </>
  )
}

export default App
