import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../store/features/kanban/KanbanSlice'
import CancelIcon from '../assets/Cancel2.svg'
import api from '../api'


const TaskInput = ({ category, setIsAdding }) => {
    const dispatch = useDispatch()
    const [priority, setPriority] = useState(1)
    const { currentUser } = useSelector(state => state.kanban)

    const AddTask = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const tags = formData.get('tag').trim()
        // const assigned = formData.get('assigned').trim()
        const newTask = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: category,
            tags: tags !== '' ? tags.split(',') : [],
            priority: priority,
            createdBy: currentUser.body._id,
            // assigned: assigned !== '' ? assigned.split(',') : [],
        }

        try {
            const { data } = await api.createTask(newTask)
            // console.log(data)
            dispatch(addTask(data.task))
            setIsAdding(false)
            setPriority(1)
            e.target.reset()
        } catch (err) {
            console.error('Task creation failed:', err.message);
        }

        // console.log(newTask)
        // dispatch(addTask(newTask))
        // e.target.reset()
        // setIsAdding(false)
    }

    return (
        <div className="form-overlay">
            <form onSubmit={AddTask} className='form'>
                <label htmlFor="taskTitle">Title : </label>
                <input
                    type="text"
                    name='title'
                    id='taskTitle'
                    autoFocus
                    autoCapitalize='Sentence'
                    required
                />
                <br />
                <label htmlFor="taskContent">Content : </label>
                <textarea
                    name='content'
                    id='taskContent'
                    required
                    rows={4}
                />
                <br />
                <label htmlFor="taskTag">Tags (Optional) : </label>
                <textarea
                    name='tag'
                    id='taskTag'
                    placeholder='Separated by commas'
                    rows={2}
                />
                {/* <label htmlFor="taskAssigned">Assigned To (Optional): </label>
                <textarea
                    name='assigned'
                    type="text"
                    id='taskAssigned'
                    placeholder='Separated by commas'
                    rows={2}
                /> */}
                <div className="radio-container">
                    <span>Priority : </span>
                    <span>
                        <input onClick={() => setPriority(1)} id='low' type="radio" className='radio low' name='priority' value="1" defaultChecked />
                        <input onClick={() => setPriority(2)} id='mid' type="radio" className='radio mid' name='priority' value="2" />
                        <input onClick={() => setPriority(3)} id='high' type="radio" className='radio high' name='priority' value="3" />
                    </span>
                </div>
                <div className="btn-container">
                    <button type="submit" title='Add Task' >Add task</button>
                    <img src={CancelIcon} alt="cancel" className='icon' onClick={(e) => setIsAdding(false)} />
                </div>
            </form>
        </div>
    )
}

export default TaskInput