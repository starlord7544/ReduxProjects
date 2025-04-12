import React, { useEffect, useRef, useState } from 'react'
import TaskBox from './TaskBox'
import { useDispatch, useSelector } from 'react-redux'
import { moveTask } from '../store/features/kanban/KanbanSlice'
import AddIcon from '../assets/Add.svg'
import TaskInput from './TaskInput'
import api from '../api'

const InnerContainer = ({ Arr, Heading, category }) => {

    // inside your component...
    const containerRef = useRef()

    useEffect(() => {
        const handleNativeDrop = (e) => {
            try {
                const movingData = JSON.parse(e.dataTransfer.getData('movingData'))
                const { fromCategory, taskId } = movingData
                const toCategory = category
                if (fromCategory !== toCategory) {
                    handleMoveTask(taskId, fromCategory, toCategory)
                }
            } catch (err) {
                console.warn('Touch drop error:', err)
            }
        }

        const el = containerRef.current
        if (el) {
            el.addEventListener('drop', handleNativeDrop)
        }

        return () => {
            if (el) {
                el.removeEventListener('drop', handleNativeDrop)
            }
        }
    }, [category]) // depend on category so each column gets it

    const [isAdding, setIsAdding] = useState(false)
    const dispatch = useDispatch()

    const { isAssignedView } = useSelector(state => state.kanban)

    const handleMoveTask = async (taskId, fromCategory, toCategory) => {
        try {
            dispatch(moveTask(
                { taskId, fromCategory, toCategory }
            ))
            await api.moveTask(taskId, toCategory)
        } catch (err) {
            console.error('Move failed : ', err.response?.data?.message)
            dispatch(moveTask({
                taskId, toCategory: fromCategory, fromCategory: toCategory
            }))
        }
    }

    return (
        <>
            {
                isAdding && <TaskInput category={category} setIsAdding={setIsAdding} />
            }
            <div
                className={`inner-container ${category}`}
                onDragOver={(e) => { e.preventDefault() }}
                onDrop={(e) => {
                    const { fromCategory, taskId } = JSON.parse(e.dataTransfer.getData('movingData'))
                    if (fromCategory === category)
                        return
                    // console.log('moving', taskId, 'from : ', fromCategory, ' to : ', category)
                    handleMoveTask(taskId, fromCategory, category)
                }}
                ref={containerRef}
            >
                <div className="top">
                    <h2>{Heading}</h2>
                    {
                        !isAssignedView && (
                            <img
                                src={AddIcon}
                                alt="Add"
                                onClick={() => {
                                    if (isAdding)
                                        return
                                    setIsAdding(true)
                                }}
                                className={'icon'}
                            />
                        )
                    }
                </div>
                {
                    Arr.map((task) => (
                        <TaskBox task={task} key={task._id} category={category} />
                    ))
                }
            </div>
        </>

    )
}

export default InnerContainer