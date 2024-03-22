import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

const EditForm = ({ id, setEdited }) => {

	const nav = useNavigate()
	const currentDate = new Date().toISOString().split('T')[0]
	const [date, setDate] = useState(new Date())
	const [activity, setActivity] = useState(null)

	async function getSingleUpdate() {
        await fetch(import.meta.env.VITE_BACKEND_API_URL+`/updates/${id}`)
        .then(response => response.json())
        .then(data => setActivity(data))
    }

    useEffect(() => {
        getSingleUpdate()
    }, [])

	function changeHandler(event) {
		let { name, value } = event.target
		setActivity({...activity,
		[name]: value})
		console.log(activity)
	}

	async function updateEntry(activity) {
		const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+`/updates/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(activity)
		})
		const data = await response.json()		
	}
	
	async function submitHandler(event) {
		event.preventDefault()
		activity.date = activity.date
		await updateEntry(activity)
		console.log(activity)
		setEdited(previousState => !previousState)
		nav('/')
	}

	function showUpdates(event) {
		event.preventDefault()
		console.log(activity)
	}

	const inputFormat = 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-setPurpleLight lg:mb-4 mt-4'
	const headingFormat = 'block mb-2 mt-4 text-sm font-medium text-setPurpleDark text-[1.25rem] lg:text-[1.5rem]'

	return (
		<>
			{activity &&
			<div className="flex justify-center bg-[#99d3cf] my-8 rounded-[15px] shadow-block-md shadow-setPurpleDark">
			<form onSubmit={submitHandler} className="w-[100%] px-8">
				<div className="my-4">
				<h2 className="text-[2rem] text-setPurpleLight font-semibold">Update entry</h2>
				<h2 className={headingFormat}>Activity type</h2>
				<input className={inputFormat} type="text" name="activity" placeholder="Oil change, replaced brake rotors" value={activity.activity} onChange={changeHandler}/>
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
				<h2 className={headingFormat}>Cost</h2>
				<input className={inputFormat} type="tel" name="cost" placeholder="$" value={activity.cost} onChange={changeHandler}/>
			</div>
				<h2 className={headingFormat}>Receipt</h2>
				<div className="file my-4">
				<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-grey-700 dark:placeholder-gray-400" id="file_input" type="file" />
				</div>
				<h2 className={headingFormat}>Extra notes</h2>
				<div className="flex flex-col my-4">
				<textarea className="textarea bg-white mb-4 text-setPurpleLight" rows="10" name="notes" value={activity.notes} onChange={changeHandler}></textarea>
				<div className="flex justify-center">
				<button className="flex w-[50%] justify-center rounded-md transition-all duration-1000 bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mb-4 lg:text-[1.25rem] lg:py-3 shadow-block-sm shadow-gray-600 animate-floatxs">Save changes</button>
				</div>
				</div> 
			</form>
			</div>
			}	
		</>
	)
	}

	export default EditForm