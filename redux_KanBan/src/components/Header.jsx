import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setUser } from '../store/features/kanban/KanbanSlice'

const Header = () => {
    const { currentUser } = useSelector(state => state.kanban)
    const dispatch = useDispatch()
    return (
        <header>
            <h2>
                <Link to={'/'}>KanBan Board</Link>
            </h2>
            {
                currentUser && currentUser._id  ? (
                    <p onClick={() => dispatch(setUser(null))}>Logout</p>
                ) : (
                    <NavLink
                        to={'/login'}
                        className={({ isActive }) =>
                            isActive ? "disabled" : ""
                        }
                    >
                        Login
                    </NavLink>
                )
            }
        </header>
    )
}

export default Header