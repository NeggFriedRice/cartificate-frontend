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
            <div className="container">
                <ul>
                    <li>
                        <div >
                            <h3 >{entry.activity}</h3>
                            <button className="delete-entry" onClick={deleteHandler}>Delete entry</button>
                        </div>
                        <h3>${entry.cost}</h3>
                        {entry && <h5>{dateMod(entry.date)}</h5>}
                        
                        <p>Notes:</p>
                        <p>{entry.notes}</p>
                    </li>
                </ul>
            </div>
        </>
        )
}

export default SingleUpdate