import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setIsAssignedView, setUser } from '../store/features/kanban/KanbanSlice'
import LogoutIcon from '../assets/Logout.svg'

const Header = () => {
    const { currentUser } = useSelector(state => state.kanban)
    const dispatch = useDispatch()
    return (
        <header>
            <h2>
                <Link to={'/'}>KanBan Board</Link>
            </h2>
            <div className="pages">
                {
                    currentUser && currentUser._id ? (
                        <>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                    isActive ? "active link" : "link"
                                }
                                onClick={() => dispatch(setIsAssignedView(false))}
                            >
                                My Tasks
                            </NavLink>
                            <NavLink
                                to={'/assigned'}
                                className={({ isActive }) =>
                                    isActive ? "active link" : "link"
                                }
                                onClick={() => dispatch(setIsAssignedView(true))}
                            >
                                Assigned</NavLink>
                            {/* <p onClick={() => dispatch(setUser(null))}>Logout</p> */}
                            <img
                                title='Logout'
                                src={LogoutIcon}
                                alt="logout"
                                onClick={() => {
                                    dispatch(setUser(null))
                                    navigator('/login')
                                }}
                            />
                        </>
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
            </div>
        </header>
    )
}

export default Header