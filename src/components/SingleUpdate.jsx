import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SingleUpdate = ({ id, deleteUpdate, updates, setUpdates }) => {

    const nav = useNavigate()
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
        nav('/')
    }

    return (
        <>
            <div className="flex justify-center animate-floatxs">
                <ul className="py-8">
                    <li className="bg-setPeach w-[350px] rounded-r-[15px] rounded-bl-[15px] p-4 shadow-block-md shadow-setPurpleDark lg:w-[700px] lg:py-6">
                        <div className="flex justify-between py-4">
                            <h3 className="text-[1.5rem] text-setPurpleDark">{entry.activity}</h3>
                            <button type="button" className="bg-red-500 rounded-lg px-2 text-sm h-[30px] m-4" onClick={deleteHandler}>Delete</button>
                        </div>
                        <div className="text-setPurpleDark py-4">
                            <h3 className="text-[1.25rem]">Cost: <span className="text-setPurpleLight">${entry.cost}</span></h3>
                            {entry && <h3 className="text-[1.25rem]">Date: <span className="text-setPurpleLight">{dateMod(entry.date)}</span></h3>}
                            <p className="text-[1.25rem]">Notes:</p>
                            <p><span className="text-setPurpleLight">{entry.notes}</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
        )
}

export default SingleUpdate