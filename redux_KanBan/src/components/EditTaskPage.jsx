import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CancelIcon from '../assets/Cancel2.svg'
import { editTask } from '../store/features/kanban/KanbanSlice'
import api from '../api'

const EditTaskPage = ({ task, setIsEditing }) => {
    const dispatch = useDispatch()
    const [priority, setPriority] = useState(task.priority)
    const [loading, setLoading] = useState(false)

    const EditTask = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const tags = formData.get('tag').trim()

        const EditedTask = {
            title: formData.get('title'),
            content: formData.get('content'),
            tags: tags !== '' ? tags.split(',') : [],
            priority: priority,
        }
        try {
            await api.updateTask(task._id, EditedTask)
            dispatch(editTask({
                taskId: task._id,
                EditedTask,
                category: task.category,
            }))
            setPriority(1)
            setIsEditing(false)
            setLoading(false)
            e.target.reset()
        } catch (err) {
            console.error(err)
        }
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
                <label htmlFor="taskAssigned">Assigned To (Optional): </label>
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
                    <button type="submit" title='Edit Task' className={loading ? 'disabled' : ''} >{loading ? 'Saving ...' : 'Edit Task'}</button>
                    <img src={CancelIcon} alt="cancel" className='icon' onClick={(e) => setIsEditing(false)} />
                </div>
            </form>
        </div>
    )
}

export default EditTaskPage