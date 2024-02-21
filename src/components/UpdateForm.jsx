import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

const UpdateForm = ({updates, addUpdate}) => {

  const nav = useNavigate()

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
    console.log(updates.length)
    nav('/')
  }

  function showUpdates(event) {
    event.preventDefault()
    console.log(activity)
  }
    
  const [date, setDate] = useState(new Date())

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>Maintenance logger</h1>
        <h2>Activity type</h2>
        <input className="input is-rounded" type="text" name="activity" placeholder="Oil change, replaced brake rotors" value={activity.name} onChange={changeHandler}/>
        <h2>Date</h2>
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yy"/>
        <h2>Cost</h2>
        <input className="input is-rounded" type="tel" name="cost" placeholder="$" value={activity.cost} onChange={changeHandler}/>
        <h2>Receipt</h2>
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name="resume" />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>
        <h2>Extra notes</h2>
        <textarea className="textarea" rows="10" name="notes" value={activity.notes} onChange={changeHandler}></textarea>
        <button className="button is-primary is-light" type="submit">Submit</button>        
      </form>
      <button className="button is-primary is-light" onClick={showUpdates}>Console Log updates</button>
    </>
  )
}

export default UpdateForm