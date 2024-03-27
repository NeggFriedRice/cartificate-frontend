import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Profile({getProfile, profile}) {

	useEffect(() => {
		getProfile()
	}, [])

	return (
		<>
		<div className="my-8 p-4 bg-setPeach rounded-lg text-setPurpleDark">
		<p>Username: {profile.username}</p>
		<p>Brand: {profile.vehicle.brand}</p>
		<p>Model: {profile.vehicle.model}</p>
		<p>Year: {profile.vehicle.year}</p>
		<p>Registration: {profile.vehicle.registration}</p>
		<p>VIN: {profile.vehicle.vin}</p>
		<button>
			<Link to="/profile/update">Edit</Link>
		</button>
		</div>
		</>
	)
}
