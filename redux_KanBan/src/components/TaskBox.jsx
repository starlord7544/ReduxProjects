import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../store/features/kanban/KanbanSlice'

const TaskBox = ({ task }) => {
    const { title, tags, content, category, id } = task
    const dispatch = useDispatch()
    return (
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
            <h3 className='task-title'>{title}</h3>
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
            <button
                className='del-btn'
                onClick={() => dispatch(deleteTask({
                    taskId: id,
                    category
                }))}
            >Delete</button>
        </div>
    )
}

export default TaskBox