import { Link } from 'react-router-dom'

const ShowUpdate = ({ updates }) => {
  return (
    <>
    <div className="log-container">
      <ul>
        {updates.map((update, index) => 
          <li key={index}>
              <Link to={`updates/${index}`}>
                <div className="update-homepage">
                  <h3 className="update-link">{index + 1}. {update.activity}</h3>
                  <h3>${update.cost}</h3>
                </div>
              </Link>
            <p className="update-display">{update.date}</p>
          </li>)}
      </ul>
    </div>
    </>
    
  )
}

export default ShowUpdate