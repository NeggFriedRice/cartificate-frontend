import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({setUser, setIsLoggedIn}) {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function changeHandler(event) {
        const { name, value } = event.target
        setFormData((previousState) => ({
            ...previousState,
            [name]: value
        }))
        console.log(formData)
    }

    async function submitHandler(event) {
        event.preventDefault()
        // Make a call to backend with the form data
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+'/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error("Incorrect username or password")
            }
            const data = await response.json()
            console.log(data)
            sessionStorage.setItem('accessToken', data.accessToken)
            sessionStorage.setItem('user', JSON.stringify(data.user))
            setUser(sessionStorage.getItem('user'))
            setIsLoggedIn(true)
            
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center px-4 py-12">
            <div className="bg-setPeach py-4 rounded-[50px] w-[350px] lg:w-[550px] shadow-block-md shadow-setPurpleDark">
                <div className="">
                    <h2 className="text-center text-lg lg:text-[1.5rem] lg:mt-8 font-bold leading-9 tracking-tight text-setPurpleDark">Sign in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6 px-4"  onSubmit={submitHandler}>
                    <div>
                        <label className="block text-sm lg:text-[1.25rem] font-medium leading-6 text-setPurpleDark">Username</label>
                        <div className="mt-2">
                        <input id="email" name="username" onChange={changeHandler} required className="block w-full rounded-md border-0 py-1.5 text-setPurpleLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-white" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label className="block text-sm lg:text-[1.25rem] font-medium leading-6 text-setPurpleDark">Password</label>
                        </div>
                        <div className="mt-2">
                        <input id="password" name="password" onChange={changeHandler} required className="block w-full rounded-md border-0 py-1.5 text-setPurpleLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-white" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="flex w-[50%] justify-center rounded-md transition-all duration-1000 bg-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mb-4 lg:text-[1.25rem] lg:py-3">Sign in</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
