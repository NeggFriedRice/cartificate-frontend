import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animationSlide } from '../utils/animation'


export default function Profile({ user, setUser, setIsLoggedIn, getUpdates }) {

	const navigate = useNavigate()
	// Loading state awaiting user info to load
	const [loading, setLoading] = useState(false)

	// Check if user info loaded function
	async function checkLoad() {
		if (!user) {
			setLoading(false)
		} 
		else {
			setLoading(true)
		}
	}

	// Log out function
	async function logOut() {
		// Clear user info from sessionStorage
		sessionStorage.clear()
		// Set user state to null
		setUser(null)
		// Set isLoggedIn state to false
		setIsLoggedIn(false)
		// Re-check for updates; should return nothing
		getUpdates()
		navigate('/')
		} 
	
	// Run user info is loaded check when user state changes
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
				<div className="bg-[#f5fda9] rounded-lg text-setPurpleDark p-4 text-[1.5rem] shadow-block-sm hover:shadow-block-smmd transition-all duration-700 flex justify-between items-center">
				<div>
					<h1 className=" font-bold">{user.username}</h1>
				</div>
				<div>
					<button type="button" onClick={logOut} className="bg-blue-500 hover:bg-blue-400 text-white text-[1rem] transition-all duration-700 px-4 py-1 rounded-lg self-start">Sign out</button>
				</div>
				</div>
			<div className="bg-[#fad19b] rounded-lg text-setPurpleDark p-4 my-4 text-[1.25rem] shadow-block-sm hover:shadow-block-smmd transition-all duration-700 flex justify-between">
				<div className="">
					<p><span className="font-bold">Brand:</span> {user.vehicle.brand}</p>
					<p><span className="font-bold">Model:</span> {user.vehicle.model}</p>
					<p><span className="font-bold">Year:</span> {user.vehicle.year}</p>
					<p><span className="font-bold">Registration:</span> {user.vehicle.registration}</p>
					<p><span className="font-bold">VIN:</span> {user.vehicle.vin}</p>
				</div>
				<div>
					<button className="bg-teal-500 hover:bg-teal-400 text-white text-[1rem] transition-all duration-700 px-4 py-1 rounded-lg">
						<Link to="/profile/update">Edit</Link>
					</button>
				</div>
			</div>
			</div>
		</motion.div>
		}
		</>
	)
}
