import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ShowUpdate = ({ updates, user }) => {

  const [filtered, setFiltered] = useState(null)
  const [renderUpdate, setRenderUpdate] = useState(false)

  const userObject = JSON.parse(user)

  function dateMod(date) {
    return date.split('T')[0]
  }

  function filterByUser(update) {
    if (update.createdBy == userObject._id) {
      return true
    }
  }

  function filterUpdates() {
    try {
      const filteredUpdates = updates.filter(filterByUser)
      setFiltered(filteredUpdates)
    } catch (err) {
      setFiltered(false)
    }
  }

  useEffect(() => {
    filterUpdates()
  }, [user])

  return (
    <>
    <div className="log-container">
      <ul>
        {!filtered || filtered.length == 0 ? <p>Add something to your list!</p> :
        filtered.map((update, index) => 
          <li key={index}>
              <Link to={`updates/${update._id}`}>
                <div className="update-homepage">
                  <h3 className="update-link">{index + 1}. {update.activity}</h3>
                  <h3>${update.cost}</h3>
                </div>
              </Link>
            <p className="update-display">{dateMod(update.date)}</p>
          </li>)}
      </ul>
    </div>
    </>
    
  )
}

export default ShowUpdate