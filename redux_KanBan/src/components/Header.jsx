import React from 'react'
import TaskInput from './TaskInput'
import { Link, NavLink } from 'react-router-dom'
import UserList from './UserList'

const Header = () => {
    return (
        <header>
            <h1>
                <Link to={'/'}>KanBan Board</Link>
            </h1>
            <NavLink
                to={'/login'}
                className={({ isActive }) =>
                    isActive ? "disabled" : ""
                }
            >
                Login
            </NavLink>
        </header>
    )
}

export default Header