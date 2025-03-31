import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <h2>
                <Link to={'/'}>KanBan Board</Link>
            </h2>
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