import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/features/kanban/KanbanSlice'
import CancelIcon from '../assets/Cancel2.svg'

const TaskInput = ({ category, setIsAdding }) => {
    const dispatch = useDispatch()

    const AddTask = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const tags = formData.get('tag').trim()
        const newTask = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: category,
            tags: tags !== '' ? tags.split(',') : [],
            priority: formData.get('priority')
        }
        dispatch(addTask(newTask))
        e.target.reset()
        setIsAdding(false)
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
                    placeholder='comma separated'
                    rows={2}
                />
                <br />
                {/* <label htmlFor="taskCategory">Category : </label>
            <select
                name='category'
                id='taskCategory'
            >
                <option value="todo">To-Do</option>
                <option value="inProgress">In-Progress</option>
                <option value="completed">Completed</option>
            </select> */}
                {/* <br />
            <label htmlFor="taskPriority">Priority : </label>
            <select
                name='priority'
                id='taskPriority'
                defaultValue='1'
            >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select> */}
                <br />
                <div className="btn-container">
                    <button type="submit" title='Add Task' >Add task</button>
                    <img src={CancelIcon} alt="cancel" className='icon' onClick={(e) => setIsAdding(false)} />
                </div>
            </form>
        </div>
    )
}

export default TaskInput