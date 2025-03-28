import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const user = {
            username: formData.get('username'),
            password: formData.get('password')
        }
        const res = await fetch('http://localhost:6969/api/v1/users/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        if (res.ok) {
            e.target.reset
            navigate('/login')
        }
    }
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Welcome To Kanban</h2>

            {/* {error && <div className="login-error">{error}</div>} */}

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
        </form>
    )
}

export default RegisterPage