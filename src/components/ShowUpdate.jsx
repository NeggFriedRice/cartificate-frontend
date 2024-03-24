import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ShowUpdate = ({ filtered }) => {

  function dateMod(date) {
    return date.split('T')[0]
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="w-[350px] lg:w-[750px] text-md p-4">

          <ul>
            {!filtered || filtered.length == 0 ? 
            <a href="/login">
              <div className="animate-float transition-all duration-700 flex justify-center py-8 mt-24 bg-setPeach hover:bg-setPeachLight rounded-full shadow-block-md hover:shadow-block-lg shadow-setPurpleDark hover:shadow-setPurpleDark">
                <p className="text-setPurpleDark lg:text-[1.5rem]">Get your maintenance started!</p>
              </div>
            </a>
            :
            filtered.map((update, index) => 
            <div className="animate-floatxs" key={index}>
              <Link to={`updates/${update._id}`}>
                <li className="py-3">
                  <div className="bg-setPeach hover:bg-setPeachLight p-2 rounded-r-[15px] rounded-bl-[15px] text-setPurpleDark shadow-block-smmd hover:shadow-block-md shadow-setPurpleDark hover:shadow-setPurpleDark transition-all duration-700 lg:w-[700px] lg:py-6">
                    
                      <div className="grid grid-cols-3 mx-2">
                        <h3 className="text-lg lg:text-[1.5rem] col-span-2">{index + 1}. {update.activity}</h3>
                        <h3 className="ml-auto lg:text-[1.5rem]">${update.cost}</h3>
                      </div>

                    <p className="px-2 text-setPurpleLight text-sm lg:text-[1rem]">{dateMod(update.date)}</p>
                  </div>
                </li>
              </Link>
            </div>)
              }
          </ul>

      </div>
    </div>
    </>
    
  )
}

export default ShowUpdate