import React, { useState } from 'react'
import TaskBox from './TaskBox'
import { useDispatch } from 'react-redux'
import { moveTask } from '../store/features/kanban/KanbanSlice'
import AddIcon from '../assets/Add.svg'
import TaskInput from './TaskInput'

const InnerContainer = ({ Arr, Heading, category }) => {
    const [isAdding, setIsAdding] = useState(false)
    const dispatch = useDispatch()
    return (
        <>

            {
                isAdding && <TaskInput category={category} setIsAdding={setIsAdding} />
            }
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
                <div className="top">
                    <h2>{Heading}</h2>
                    <img
                        src={AddIcon}
                        alt="Add"
                        onClick={() => {
                            if (isAdding)
                                return
                            setIsAdding(true)
                        }}
                        className='icon'
                    />
                </div>
                {
                    Arr.map((task) => (
                        <TaskBox task={task} key={task.id} category={category} />
                    ))
                }
            </div>
        </>

    )
}

export default InnerContainer