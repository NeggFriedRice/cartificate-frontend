import { useNavigate } from 'react-router-dom'


const SingleUpdate = ({ update, id, deleteUpdate, updates, setUpdates }) => {

    const nav = useNavigate()

    function deleteHandler() {
        console.log("button clicked")
        let updatesArray = updates
        updatesArray.splice(id, 1)
        setUpdates(updatesArray)
        deleteUpdate(id)
        nav('/')
    }

    return (
        <>
            <div className="container">
                <ul>
                    <li>
                        <div className="update-title">
                            <h3 className="update-link">{parseInt(id) + 1}. {update.activity}</h3>
                            <button className="delete-entry" onClick={deleteHandler}>Delete entry</button>
                        </div>
                        <h3>${update.cost}</h3>
                        <h5 className="update-display">{update.date}</h5>
                        <p className="update-notes">Notes:</p>
                        <p className="update-display">{update.notes}</p>
                    </li>
                </ul>
            </div>
        </>
        )
}

export default SingleUpdate