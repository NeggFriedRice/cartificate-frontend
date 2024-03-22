import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ShowUpdate = ({ updates, filtered, user }) => {

  // const [filtered, setFiltered] = useState(null)

  // const userObject = JSON.parse(user)

  function dateMod(date) {
    return date.split('T')[0]
  }

  // function filterByUser(update) {
  //   if (update.createdBy == userObject._id) {
  //     return true
  //   }
  // }

  // function filterUpdates() {
  //   try {
  //     const filteredUpdates = updates.filter(filterByUser)
  //     setFiltered(filteredUpdates)
  //   } catch (err) {
  //     setFiltered(false)
  //   }
  // }

  // useEffect(() => {
  //   filterUpdates()
  // }, [user])

  return (
    <>
    <div className="w-[300px] text-md p-4">
      <ul>
        {!filtered || filtered.length == 0 ? 
        <div className="flex justify-center py-8">
          <p className="text-white">Get your maintenance started!</p>
        </div> 
        :
        filtered.map((update, index) => 
          <li key={index} className="py-2">
              <Link to={`updates/${update._id}`}>
                <div className="flex justify-between">
                  <h3 className="text-lg">{index + 1}. {update.activity}</h3>
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