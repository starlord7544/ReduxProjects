import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { setUser } from '../store/features/kanban/KanbanSlice'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        try {
            const { data } = await api.login(
                formData.get('username'),
                formData.get('password')
            )

            dispatch(setUser(data))
            navigate('/')
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || 'Login failed')
        }
    }
    return (
        // <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Welcome Back</h2>
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
                Log In
            </button>

            <div className="login-footer">
                <span>New here? </span>
                <Link to="/register" className="signup-link">
                    Create an account
                </Link>
            </div>
            {error && <div className="login-error">{error}</div>}
        </form>
    )
}

export default LoginPage