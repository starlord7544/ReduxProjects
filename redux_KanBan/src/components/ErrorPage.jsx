import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const API_PING_URL = "https://reduxprojects.onrender.com/ping"

const ErrorPage = () => {
    const navigate = useNavigate()
    const checkPing = async () => {
        console.log('fetch started')
        try {
            await fetch(API_PING_URL)
            navigate(`/`)
        } catch (err) {
            setTimeout(() => checkPing(), 10000)
        }
    }
    useEffect(() => {
        checkPing()
    }, [])

    return (
        <div className="form-overlay">
            <form className='error'>
                <h1>Network Error, Kindly check your network connection</h1>
            </form>
        </div>
    )
}

export default ErrorPage