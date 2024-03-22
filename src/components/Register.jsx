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
        if (formData.password !== formData.confirmPassword) {
            alert("Your passwords are still not matching!")
            return
        }

        // Make a call to backend
        const checkUserExists = await fetch(import.meta.env.VITE_BACKEND_API_URL+`/auth/users/${formData.username}`)
        if (checkUserExists.status == 200) {
            alert("Username already in use")
            return
        }

        // Make a call to backend with the form data
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+'/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                console.log("User successfully registered")
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center px-6 py-12 lg:px-8">
            <div className="bg-setPeach py-4 rounded-[50px] w-[350px] shadow-block-md shadow-setPurpleDark">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-lg font-bold leading-9 tracking-tight text-setPurpleDark">Sign up!</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6 px-4"  onSubmit={submitHandler}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-setPurpleDark">Username</label>
                        <div className="mt-2">
                            <input id="email" name="username" onChange={changeHandler} required className="block w-[100%] rounded-md border-0 py-1.5 text-setPurpleLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-white" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-setPurpleDark">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" onChange={changeHandler} required className="block w-[100%] rounded-md border-0 py-1.5 text-setPurpleLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-white" />
                            </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-setPurpleDark ">Re-type password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirmPassword" name="confirmPassword" onChange={changeHandler} required className="block w-[100%] rounded-md border-0 py-1.5 text-setPurpleLight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-white" />
                            </div>
                    </div>
                    <div className="">
                    {formData.password !== formData.confirmPassword && <p className="text-red-500 text-sm">Passwords don't match!</p>}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="flex w-[50%] justify-center rounded-md transition-all duration-1000 bg-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mb-4">Sign up</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
