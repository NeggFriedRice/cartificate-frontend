import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Profile({getUser, getProfile, profile, user}) {

	useEffect(() => {
		getUser()
		getProfile()
		console.log(user)
	}, [])

	return (
		<>
		<div className="my-8 p-4 bg-setPeach rounded-lg text-setPurpleDark">
		<p>Username: {user.username}</p>
		<p>Brand: {user.vehicle.brand}</p>
		<p>Model: {user.vehicle.model}</p>
		<p>Year: {user.vehicle.year}</p>
		<p>Registration: {user.vehicle.registration}</p>
		<p>VIN: {user.vehicle.vin}</p>
		<button>
			<Link to="/profile/update">Edit</Link>
		</button>
		</div>
		</>
	)
}
