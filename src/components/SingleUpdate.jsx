import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SingleUpdate = ({ id, deleteUpdate, updates, setUpdates }) => {

    const navigate = useNavigate()
    const [entry, setEntry] = useState("")

    function dateMod(date) {
        return date.split('T')[0]
      }

    async function getSingleUpdate() {
        await fetch(import.meta.env.VITE_BACKEND_API_URL+`/updates/${id}`)
        .then(response => response.json())
        .then(data => setEntry(data))
    }

    useEffect(() => {
        getSingleUpdate()
    }, [])

    function deleteHandler() {
       deleteUpdate(id)
        navigate('/')
    }

    function navToEdit() {
        navigate(`/updates/edit/${id}`)
    }

    return (
        <>
            <div className="flex justify-center animate-floatxs">
                <ul className="py-8">
                    <li className="bg-setPeach w-[350px] rounded-r-[15px] rounded-bl-[15px] p-4 shadow-block-md shadow-setPurpleDark lg:w-[700px] lg:py-6">
                        <div className="grid grid-cols-3 py-4">
                            <h3 className="text-[1.5rem] lg:text-[2rem] text-setPurpleDark col-span-2">{entry.activity}</h3>
                            <div className="flex flex-wrap">
                                <button type="button" className="bg-teal-500 w-[65px] rounded-lg px-2 text-sm h-[30px] mx-4 my-1" onClick={navToEdit}>Edit</button>
                                <button type="button" className="bg-red-500 w-[65px] rounded-lg px-2 text-sm h-[30px] mx-4 my-1" onClick={deleteHandler}>Delete</button>
                            </div>
                        </div>
                        <div className="text-setPurpleDark py-4 text-[1.25rem] lg:text-[1.5rem]">
                            <h3>Cost: <span className="text-setPurpleLight">${entry.cost}</span></h3>
                            {entry && <h3>Date: <span className="text-setPurpleLight">{dateMod(entry.date)}</span></h3>}
                            <p>Notes:</p>
                            <p><span className="text-setPurpleLight">{entry.notes}</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
        )
}

export default SingleUpdate