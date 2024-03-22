import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ShowUpdate = ({ updates, filtered, user }) => {

  function dateMod(date) {
    return date.split('T')[0]
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="w-[350px] text-md p-4">

          <ul>
            {!filtered || filtered.length == 0 ? 
            <div className="flex justify-center py-8">
              <p className="text-setPurpleDark">Get your maintenance started!</p>
            </div> 
            :
            filtered.map((update, index) => 
              <li key={index} className="py-3">
                <div className="bg-setPeach p-2 rounded-r-[15px] rounded-bl-[15px] text-setPurpleDark shadow-block-smmd shadow-setPurpleDark">
                  <Link to={`updates/${update._id}`}>
                    <div className="flex justify-between px-2">
                      <h3 className="text-lg">{index + 1}. {update.activity}</h3>
                      <h3>${update.cost}</h3>
                    </div>
                  </Link>
                  <p className="text-gray-500 px-2">{dateMod(update.date)}</p>
                </div>
              </li>)}
          </ul>

      </div>
    </div>
    </>
    
  )
}

export default ShowUpdate