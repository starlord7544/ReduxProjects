import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, setIsAssignPage } from '../store/features/kanban/KanbanSlice'
import EditIcon from '../assets/Edit.svg'
import Del from '../assets/Delete.svg'
import CancelIcon from '../assets/Cancel.svg'
import EditTaskPage from './EditTaskPage'
import AssignIcon from '../assets/Assign.svg'
import UserList from './UserList'
import api from '../api'
import e from 'cors'

const TaskBox = ({ task, handleMoveTask }) => {
    const [isEditing, setIsEditing] = useState(false)
    const { title, tags, assignedTo, content, category, _id, priority } = task
    // console.log(title, tags, assignedTo, content, category, _id, priority)
    const dispatch = useDispatch()
    const { isAssignedView } = useSelector(state => state.kanban)
    const assignPage = useSelector(state => state.kanban.assignPage)

    const handleDelete = async () => {
        try {
            dispatch(deleteTask({
                taskId: _id,
                category
            }))
            await api.deleteTask(_id)
        } catch (err) {
            console.error('Delete Failed : ', err)
        }
    }

    const handleTouchStart = (e) => {
        e.currentTarget.dataset.touchStartX = e.touches[0].clientX
        e.currentTarget.dataset.touchStartY = e.touches[0].clientY

        e.currentTarget.dataset.taskId = _id
        e.currentTarget.dataset.fromCategory = category
    }
    const handleTouchEnd = () => {
        const touch = e.changedTouches[0]
        const x = touch.clientX
        const y = touch.clientY

        const element = document.elementFromPoint(x, y)

        if (element?.closest('.inner-container')) {
            const toCategory = element.closest('.inner-container').classList[1]
            const { taskId, fromCategory } = e.currentTarget.dataset

            if (toCategory && fromCategory !== toCategory)
                handleMoveTask(taskId, fromCategory, toCategory)
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
                onDragStart={(e) => {
                    const movingData = {
                        fromCategory: category,
                        taskId: _id
                    }
                    e.dataTransfer.setData('movingData', JSON.stringify(movingData))
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="title-container">
                    <div className={`task-priority ${priority && priority === 1 ? ('low') : (priority === 2 ? 'mid' : 'high')}`}></div>
                    <h3 className='task-title'>{title}</h3>
                </div>
                <p className='content'>{content}</p>
                <div className="tags">
                    {
                        tags?.map((tag, tagIdx) => (
                            <span className="tag" key={tagIdx + 'tag'}>
                                {tag}
                            </span>
                        ))
                    }
                </div>
                {/* <div className="task-btn-container"></div> */}
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
                        assignedTo?.map((user, idx) => {
                            if (idx <= 3) {
                                return (
                                    <p
                                        className='user-profile'
                                        key={user._id}
                                        onClick={() => {
                                            if (idx < 3)
                                                return
                                            dispatch(setIsAssignPage(assignPage === '' ? _id : ''))
                                        }}
                                        title={idx < 3 ? user.username : 'show more'}
                                    >
                                        {idx < 3 ? user?.username?.trim()[0] : '...'}
                                    </p>
                                )
                            }
                            else
                                return null
                        })
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
                    className={(assignPage !== _id && assignPage !== '') ? (`assign-btn disabled`) : ('assign-btn')}
                    onClick={() => {
                        dispatch(setIsAssignPage(assignPage === '' ? _id : ''))
                    }}
                />
            </div >
        </>
    )
}

export default TaskBox