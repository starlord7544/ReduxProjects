import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, setIsAssignPage } from '../store/features/kanban/KanbanSlice'
import EditIcon from '../assets/Edit.svg'
import Del from '../assets/Delete.svg'
import CancelIcon from '../assets/Cancel.svg'
import EditTaskPage from './EditTaskPage'
import AssignIcon from '../assets/Assign.svg'
import UserList from './UserList'

const TaskBox = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false)
    const { title, tags, assigned, content, category, id, priority } = task
    const dispatch = useDispatch()
    const assignPage = useSelector(state => state.kanban.assignPage)
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
                        taskId: id
                    }
                    e.dataTransfer.setData('movingData', JSON.stringify(movingData))
                }}
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
                        className='edit-btn'
                        onClick={() => setIsEditing(true)}
                        src={EditIcon}
                        alt="edit"
                    />
                    <img
                        className='del-btn'
                        onClick={() => dispatch(deleteTask({
                            taskId: id,
                            category
                        }))}
                        src={Del}
                        alt='delete'
                    />
                </div>
                <div className="assigned">
                    {
                        assigned?.map((ele, assignedIdx) => {
                            if (assignedIdx <= 3) {
                                return (
                                    <p
                                        className='user-profile'
                                        key={assignedIdx + 'assigned'}
                                        onClick={() => {
                                            if (assignedIdx < 3)
                                                return
                                            dispatch(setIsAssignPage(assignPage === '' ? id : ''))
                                        }}
                                    >
                                        {assignedIdx < 3 ? ele.trim()[0] : '...'}
                                    </p>
                                )
                            }
                            else
                                return null
                        })
                    }
                    {
                        assignPage === id && <UserList List={[]} filter={false} />
                    }
                </div>
                <img
                    src={(assignPage === id) ? CancelIcon : AssignIcon}
                    alt="assign"
                    className={(assignPage !== id && assignPage !== '') ? (`assign-btn disabled`) : ('assign-btn')}
                    onClick={() => {
                        dispatch(setIsAssignPage(assignPage === '' ? id : ''))
                    }}
                />
            </div >
        </>
    )
}

export default TaskBox