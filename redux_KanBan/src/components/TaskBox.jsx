import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, editTask } from '../store/features/kanban/KanbanSlice'
import EditIcon from '../assets/Edit.svg'
import Del from '../assets/Delete.svg'
import EditTaskPage from './EditTaskPage'
// import DeleteIcon from '..assets/Delete.svg'

const TaskBox = ({ task }) => {
    const [isEditing, setIsEditing] = useState('')
    const { title, tags, assigned, content, category, id, priority } = task
    const dispatch = useDispatch()
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
                {/* <div className="assigned">
                    {
                        assigned?.map((ele, assignedIdx) => (
                            <p key={assignedIdx + 'assigned'}>
                                @{ele}
                            </p>
                        ))
                    }
                </div> */}
                {/* <div className="task-btn-container"> */}
                    <div className="task-btns">
                        <img
                            className='edit-btn btn'
                            onClick={() => setIsEditing(true)}
                            src={EditIcon}
                            alt="edit"
                        />
                        <img
                            className='del-btn btn'
                            onClick={() => dispatch(deleteTask({
                                taskId: id,
                                category
                            }))}
                            src={Del}
                            alt='delete'
                        />
                    {/* </div> */}
                </div>
            </div >
        </>
    )
}

export default TaskBox