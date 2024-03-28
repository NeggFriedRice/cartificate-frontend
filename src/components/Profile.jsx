import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animationSlide } from './animation'

export default function Profile({getUser, getProfile, profile, user}) {

	const [loading, setLoading] = useState(false)

	async function checkLoad() {
		if (!user) {
			setLoading(false)
		} 
		else {
			setLoading(true)
		}
	}

	useEffect(() => {
		checkLoad()
	}, [user])

	return (
		<>
		{ loading &&
		<motion.div 
		key="profile"
		initial={animationSlide.hidden}
		animate={animationSlide.visible}
		exit={animationSlide.exit}
		className="my-8 p-4">
			<div className="">
				<h1 className="bg-[#f5fda9] rounded-lg text-setPurpleDark p-4 text-[1.5rem] shadow-block-sm hover:shadow-block-smmd transition-all duration-700 font-bold">{user.username}</h1>
			<div className="bg-[#fad19b] rounded-lg text-setPurpleDark p-4 my-4 text-[1.25rem] shadow-block-sm hover:shadow-block-smmd transition-all duration-700">
				<div className="">
					<p><span className="font-bold">Brand:</span> {user.vehicle.brand}</p>
					<p><span className="font-bold">Model:</span> {user.vehicle.model}</p>
					<p><span className="font-bold">Year:</span> {user.vehicle.year}</p>
					<p><span className="font-bold">Registration:</span> {user.vehicle.registration}</p>
					<p><span className="font-bold">VIN:</span> {user.vehicle.vin}</p>
				</div>
				<button className="bg-teal-500 hover:bg-teal-400 text-white text-[1rem] transition-all duration-700 px-2 rounded-lg mt-4">
					<Link to="/profile/update">Edit</Link>
				</button>
			</div>
			</div>
		</motion.div>
		}
		</>
	)
}
