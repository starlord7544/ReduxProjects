import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/features/kanban/KanbanSlice'

const TaskInput = () => {
    const dispatch = useDispatch()

    const AddTask = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newTask = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
            tags : formData.get('tag').split(','),
        }
        dispatch(addTask(newTask))
        e.target.reset()
    }

    return (
        <form onSubmit={AddTask}>
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
            />
            <br />
            <label htmlFor="taskTag">Tags (Optional) : </label>
            <textarea
                name='tag'
                id='taskTag'
                placeholder='comma separated'
            />
            <br />
            <label htmlFor="taskCategory">Category : </label>
            <select
                name='category'
                id='taskCategory'
            >
                <option value="todo">To-Do</option>
                <option value="inProgress">In-Progress</option>
                <option value="completed">Completed</option>
            </select>
            {/* <label htmlFor="taskPriority">Priority : </label>
            <select name="" id="" defaultValue={'medium'}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">Top</option>
            </select> */}
            <br />
            <button type="submit" >Add task</button>
        </form>
    )
}

export default TaskInput