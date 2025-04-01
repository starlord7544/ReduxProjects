import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData(e.target)
            const res = await api.register(
                formData.get('username'),
                formData.get('password')
            )
            e.target.reset
            navigate('/login')
        } catch (err) {
            console.log(err.response.data.message)
            setError(err.response?.data?.message || 'Registration failed')
        }
    }
    return (
        <form className="login-form" onSubmit={handleSubmit} onChange={() => setError('')}>
            <h2 className="login-title">Welcome To Kanban</h2>
            <div className="input-group">
                <label htmlFor="username">Username or Email</label>
                <input
                    type="text"
                    id="username"
                    name='username'
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name='password'
                />
            </div>

            <button type="submit" className="login-button">
                Sign Up
            </button>

            <div className="login-footer">
                <span>Already have an account ? </span>
                <Link to="/login" className="signup-link">
                    Sign in
                </Link>
            </div>
            {error && <div className="login-error">{error}</div>}
        </form>
    )
}

export default RegisterPage