import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
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
            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+'/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.response == 400) {
                alert("Something went wrong!")
            } else {
                navigate('/login')
            }
            
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="bg-white py-16 rounded-[50px]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up!</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6"  onSubmit={submitHandler}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="email" name="username" onChange={changeHandler} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" onChange={changeHandler} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white" />
                            </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Re-type password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirmPassword" name="confirmPassword" onChange={changeHandler} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white" />
                            </div>
                    </div>
                    <div className="h-[1rem]">
                    {formData.password !== formData.confirmPassword && <p className="text-red-500">Passwords don't match!</p>}
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
