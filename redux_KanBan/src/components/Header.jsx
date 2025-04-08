import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { setIsAssignedView, setSortby, setUser } from '../store/features/kanban/KanbanSlice'
import LogoutIcon from '../assets/Logout.svg'
import SortIcon from '../assets/SortIcon.svg'

const Header = () => {
    const { currentUser } = useSelector(state => state.kanban)
    // const { sortBy } = useSelector(state => state.kanban)
    // const [isSortPage, setIsSortPage] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <header>
            <h2 className='heading'>
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
                            {/* <div className="sort-by-container">
                                <img src={SortIcon} alt="" onClick={() => setIsSortPage(prev => !prev)} />
                                {
                                    isSortPage && (
                                        <select onChange={(e) => dispatch(setSortby(e.target.value))}>
                                            <option value="priority" defaultValue={true}>Prioirty</option>
                                            <option value="createdAt">Date</option>
                                        </select>
                                    )
                                }
                            </div> */}
                            <img
                                title='Logout'
                                src={LogoutIcon}
                                alt="logout"
                                onClick={() => {
                                    dispatch(setUser(null))
                                    navigate('/login')
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