import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api'
import { setUser } from '../store/features/kanban/KanbanSlice'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        try {
            const { data } = await api.login(
                formData.get('username'),
                formData.get('password')
            )
            console.log(data)
            dispatch(setUser(data.body))
            setLoading(false)
            navigate('/')
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || 'Login failed')
            setLoading(false)
        }
    }
    return (
        // <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit} onChange={() => setError('')}>
            <h2 className="login-title">Welcome Back</h2>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name='username'
                    autoFocus
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
                {loading ? 'Verifying ...' : 'Log In'}
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