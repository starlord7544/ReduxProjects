import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, setIsAssignPage } from '../store/features/kanban/KanbanSlice'
import { setGhostTask, updateGhostPosition, clearGhostTask } from '../store/features/kanban/ghostSlice'
import EditIcon from '../assets/Edit.svg'
import Del from '../assets/Delete.svg'
import CancelIcon from '../assets/Cancel.svg'
import EditTaskPage from './EditTaskPage'
import AssignIcon from '../assets/Assign.svg'
import UserList from './UserList'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const TaskBox = ({ task, category }) => {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAssignedView, assignPage } = useSelector(state => state.kanban)
    const { title, tags, assignedTo, content, _id, priority } = task

    const dragTimeout = useRef(null)
    const isDragging = useRef(false)

    const handleDragStart = (e) => {
        const movingData = {
            fromCategory: category,
            taskId: _id
        }
        e.dataTransfer.setData('movingData', JSON.stringify(movingData))
    }

    const handleTouchStart = (e) => {
        const touch = e.touches[0]
        dragTimeout.current = setTimeout(() => {
            isDragging.current = true
            const movingData = {
                fromCategory: category,
                taskId: _id
            }
            window.__movingData = movingData
            dispatch(setGhostTask({
                task,
                position: { x: touch.clientX, y: touch.clientY }
            }))
        }, 300)
    }

    const handleTouchMove = (e) => {
        if (!isDragging.current)
            return
        const touch = e.touches[0]
        dispatch(updateGhostPosition({
            x: touch.clientX,
            y: touch.clientY
        }))
    }

    const handleTouchEnd = (e) => {
        clearTimeout(dragTimeout.current)

        if (isDragging.current) {
            const touch = e.changedTouches[0]
            const el = document.elementFromPoint(touch.clientX, touch.clientY)

            if (el && el.closest('.inner-container')) {
                const dropTarget = el.closest('.inner-container')
                const dropCategory = dropTarget.classList[1]

                if (dropCategory && dropCategory !== category) {
                    const dropEvent = new Event('drop', { bubbles: true })
                    dropEvent.dataTransfer = {
                        getData: () => JSON.stringify(window.__movingData)
                    }
                    dropTarget.dispatchEvent(dropEvent)
                }
            }

            isDragging.current = false
            dispatch(clearGhostTask())
        }
    }

    const handleDelete = async () => {
        try {
            dispatch(deleteTask({
                taskId: _id,
                category
            }))
            await api.deleteTask(_id)
        } catch (err) {
            console.error('Delete Failed : ', err)
            navigate(`/404`)
        }
    }

    return (
        <>
            {
                isEditing && <EditTaskPage task={task} setIsEditing={setIsEditing} />
            }
            <div
                className="task-container"
                draggable={true}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            >
                <div className="title-container">
                    <div className={`task-priority ${priority && priority === 1 ? ('low') : (priority === 2 ? 'mid' : 'high')}`}></div>
                    <h3 className='task-title'>{title}</h3>
                </div>
                <p className='content'>{content}</p>
                <div className="tags">
                    {
                        tags?.map((tag, idx) => (
                            <span className="tag" key={idx}>{tag}</span>
                        ))
                    }
                </div>
                <div className="task-btns">
                    <img
                        className={assignPage !== '' ? 'edit-btn disabled' : 'edit-btn'}
                        onClick={() => setIsEditing(true)}
                        src={EditIcon}
                        alt="edit"
                    />
                    {
                        !isAssignedView && (
                            <img
                                className={assignPage !== '' ? 'del-btn disabled' : 'del-btn'}
                                onClick={handleDelete}
                                src={Del}
                                alt='delete'
                            />
                        )
                    }
                </div>
                <div className="assigned">
                    {
                        assignedTo?.map((user, idx) => (
                            idx <= 3 && (
                                <p
                                    className='user-profile'
                                    key={user._id}
                                    onClick={() => idx >= 3 && dispatch(setIsAssignPage(assignPage === '' ? _id : ''))}
                                    title={idx < 3 ? user.username : 'show more'}
                                >
                                    {idx < 3 ? user.username?.trim()[0] : '...'}
                                </p>
                            )
                        ))
                    }
                    {
                        assignPage === _id && (
                            <UserList
                                taskId={_id}
                                initialAssigned={assignedTo}
                                category={category}
                            />
                        )
                    }
                </div>
                <img
                    src={(assignPage === _id) ? CancelIcon : AssignIcon}
                    alt="assign"
                    className={(assignPage !== _id && assignPage !== '') ? 'assign-btn disabled' : 'assign-btn'}
                    onClick={() => {
                        dispatch(setIsAssignPage(assignPage === '' ? _id : ''))
                    }}
                />
            </div>
        </>
    )
}

export default TaskBox
