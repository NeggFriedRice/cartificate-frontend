import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

const UpdateForm = ({updates, addUpdate}) => {

  const nav = useNavigate()
  const currentDate = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(new Date())

  let initialEntry = {
    activity: "",
    date: "",
    cost: "",
    notes: ""
  }

  let [activity, setActivity] = useState(initialEntry)

  function changeHandler(event) {
    let { name, value } = event.target
    setActivity({...activity,
      [name]: value})
      console.log(activity)
  }
  
  function dateMod(string) {
    let dateString = String(string).split(' ')
    let monthDayYear = dateString.slice(1, 4).join(' ')
    return monthDayYear
  }

  async function submitHandler(event) {
    event.preventDefault()
    activity.date = dateMod(date)
    await addUpdate(activity)
    console.log(activity)
    nav('/')
  }

  function showUpdates(event) {
    event.preventDefault()
    console.log(activity)
  }

  const inputFormat = 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
  const headingFormat = 'block mb-2 text-sm font-medium text-white text-[1.25rem]'

  return (
    <>
    <div className="flex justify-center">
      <form onSubmit={submitHandler} className="w-[100%] px-8">
        <div className="my-4">
          <h2 className={headingFormat}>Activity type</h2>
          <input className={inputFormat} type="text" name="activity" placeholder="Oil change, replaced brake rotors" value={activity.name} onChange={changeHandler}/>
        </div>
        <div className="my-4">
          <label className={headingFormat}>Date</label>
          <input
              type='date'
              name='date'
              id='date'
              pattern='\d{4}-\d{2}-\d{2}'
              value={activity.date}
              onChange={changeHandler}
              className={inputFormat}
              placeholder=''
              required=''
          />
      </div>
      <div className="my-4">
        <h2 className='block mb-2 text-sm font-medium text-white text-[1.25rem]'>Cost</h2>
        <input className={inputFormat} type="tel" name="cost" placeholder="$" value={activity.cost} onChange={changeHandler}/>
      </div>
        <h2 className={headingFormat}>Receipt</h2>
        <div className="file my-4">
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-grey-700 dark:placeholder-gray-400" id="file_input" type="file" />
        </div>
        <h2 className={headingFormat}>Extra notes</h2>
        <div className="flex flex-col my-4">
          <textarea className="textarea bg-white mb-4 text-black" rows="10" name="notes" value={activity.notes} onChange={changeHandler}></textarea>
          <div className="flex justify-center">
           <button className="bg-green-800 w-[50%] rounded-full py-2" type="submit">Submit</button>
          </div>
        </div> 
      </form>
    </div>
      {/* <button className="button is-primary is-light" onClick={showUpdates}>Console Log updates</button> */}
    </>
  )
}

export default UpdateForm