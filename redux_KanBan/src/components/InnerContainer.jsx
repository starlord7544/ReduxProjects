import React from 'react'
import TaskBox from './TaskBox'
import { useDispatch } from 'react-redux'
import { moveTask } from '../store/features/kanban/KanbanSlice'

const InnerContainer = ({ Arr, Heading, category }) => {
    const dispatch = useDispatch()
    return (
        <div
            className={`inner-container ${category}`}
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={(e) => {
                const { fromCategory, taskId } = JSON.parse(e.dataTransfer.getData('movingData'))
                if (fromCategory === category)
                    return
                console.log('moving', taskId, 'from : ', fromCategory, ' to : ', category)
                dispatch(moveTask({ taskId, fromCategory, toCategory: category }))
            }}
        >
            <h2>{Heading}</h2>
            {
                Arr.map((task) => (
                    <TaskBox task={task} key={task.id} category={category} />
                ))
            }
        </div>
    )
}

export default InnerContainer