/* eslint react/forbid-prop-types: 0 */

import { useEffect, useState } from 'react'
import UpdateForm from './components/UpdateForm'
import { Routes, Route, useParams, useLocation } from 'react-router-dom'
import ShowUpdate from './components/ShowUpdate'
// import NavBar from './components/NavBar'
import NavBar2 from './components/NavBar2'
import Login from './components/Login'
import SingleUpdate from './components/SingleUpdate'
import Register from './components/Register'
import EditForm from './components/EditForm'
import { AnimatePresence } from 'framer-motion'
import HowToUse from './components/HowToUse'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import axios from 'axios'


function App() {

  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [filtered, setFiltered] = useState(null)
  const [image, setImage] = useState(null)

  async function getUpdates() {
    await fetch(import.meta.env.VITE_BACKEND_API_URL+'/updates')
    .then(data => data.json())
    .then(updates => filterUpdates(updates))
  }

  function filterByUser(update) {
    
    if (user && update.createdBy == user._id) {
      return true
    }
  }

  function filterUpdates(updates) {
    try {
      const filteredUpdates = updates.filter(filterByUser)
      setFiltered(filteredUpdates)
    } catch (err) {
      setFiltered(false)
    }
  }

  async function getUser() {
    const userInfo = JSON.parse(sessionStorage.getItem("user"))
    try {
      await fetch(import.meta.env.VITE_BACKEND_API_URL+`/profile/${userInfo._id}`)
      .then(response => response.json())
      .then(profile => setUser(profile))
    } catch (err) {
      return
    }
  }

  useEffect(() => {
    getUser()
    getUpdates()
  }, [])

  useEffect(() => {
      getUpdates()
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
  async function addUpdate(content, event) {
    // Create new entry object from content data
    const newUpdate = {
      activity: content.activity,
      date: content.date,
      cost: content.cost,
      notes: content.notes,
      createdBy: user._id,
      img: "",
      imgUrl: ""
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
    // Extra newly created update to attach file to
    const updateId = data._id
    await imageUpload(updateId, event)
    getUpdates()

    // getUpdates()
    } catch (err) {
      console.log(err)
    }
  }

  async function imageUpload(updateId, event) {
    // Extract attached image from form
    event.preventDefault()
    const file = event.target.elements.file_input.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      setImage(formData)
  
      try {
        const response = axios.post(import.meta.env.VITE_BACKEND_API_URL+`/image/update/${updateId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      return
    }

  }

  const UpdateWrapper = ({deleteUpdate}) => {
    const { id } = useParams()
    return <SingleUpdate id={id} deleteUpdate={deleteUpdate} user={user}/>
  }

  const EditWrapper = () => {
    const { id } = useParams()
    return <EditForm id={id} setEdited={setEdited} imageUpload={imageUpload}/>
  }

  return (
    <>
      <NavBar2 user={user} filtered={filtered}/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
        <Route path='/' key="showUpdate" element={<ShowUpdate user={user} filtered={filtered} getUpdates={getUpdates}/>}></Route>
        <Route path="/updates/new" element={<UpdateForm addUpdate={addUpdate} />}></Route>
        <Route path='/updates/:id' element={<UpdateWrapper deleteUpdate={deleteUpdate}/>} />
        <Route path='/updates/edit/:id' element={<EditWrapper />} />
        <Route path='/login' key="logIn" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} getUpdates={getUpdates}/>}/>
        <Route path='/profile/update' element={<EditProfile user={user} getUser={getUser} />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/info' element={<HowToUse />} />
        </Routes>
      </AnimatePresence>  
    </>
  )
}

export default App
