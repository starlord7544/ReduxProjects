import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CancelIcon from '../assets/Cancel2.svg'
import { editTask } from '../store/features/kanban/KanbanSlice'

const EditTaskPage = ({ task, setIsEditing }) => {
    const dispatch = useDispatch()
    const [priority, setPriority] = useState(task.priority)

    const EditTask = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const tags = formData.get('tag').trim()

        const EditedTask = {
            title: formData.get('title'),
            content: formData.get('content'),
            tags: tags !== '' ? tags.split(',') : [],
            category: task.category,
            priority: priority
        }
        setPriority(1)
        dispatch(editTask({
            taskId : task.id,
            EditedTask
        }))
        e.target.reset()
        setIsEditing(false)
    }

    return (
        <div className="form-overlay">
            <form onSubmit={EditTask} className='form'>
                <label htmlFor="taskTitle">Title : </label>
                <input
                    type="text"
                    name='title'
                    id='taskTitle'
                    autoFocus
                    required
                    defaultValue={task.title}
                />
                <br />
                <label htmlFor="taskContent">Content : </label>
                <textarea
                    name='content'
                    id='taskContent'
                    required
                    rows={4}
                    defaultValue={task.content}
                />
                <br />
                <label htmlFor="taskTag">Tags (Optional) : </label>
                <textarea
                    name='tag'
                    id='taskTag'
                    placeholder='Separated by commas'
                    rows={2}
                    defaultValue={task.tags.join(',')}
                />
                <br />
                <div className="radio-container">
                    <span>Priority : </span>
                    <span>
                        <input
                            onClick={() => setPriority(1)}
                            id='low' type="radio"
                            className='radio low'
                            name='priority' value={1}
                            defaultChecked={task.priority === 1}
                        />
                        <input
                            onClick={() => setPriority(2)}
                            id='mid' type="radio"
                            className='radio mid'
                            name='priority' value={2}
                            defaultChecked={task.priority === 2}
                        />
                        <input
                            onClick={() => setPriority(3)}
                            id='high' type="radio"
                            className='radio high'
                            name='priority' value={3}
                            defaultChecked={task.priority === 3}
                        />
                    </span>
                </div>
                <br />
                <div className="btn-container">
                    <button type="submit" title='Edit Task' >Edit task</button>
                    <img src={CancelIcon} alt="cancel" className='icon' onClick={(e) => setIsEditing(false)} />
                </div>
            </form>
        </div>
    )
}

export default EditTaskPage