import React, { useEffect } from 'react'
import InnerContainer from './InnerContainer'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api'
import { setAssignedTasks } from '../store/features/kanban/KanbanSlice'

const AssignedPage = () => {
    const dispatch = useDispatch()
    const { currentUser, assignedTasks } = useSelector(state => state.kanban)

    useEffect(() => {
        const loadAssignedTasks = async () => {
            try {
                const res = await api.getAssignedTasks(currentUser._id)
                dispatch(setAssignedTasks(res.data.tasks))
            } catch (err) {
                console.error('Failed to load assigned tasks:', err);
            }

        }
        if (currentUser && currentUser._id)
            loadAssignedTasks()
        else
            loadAssignedTasks()
    }, [currentUser, dispatch])

    return (
        <div className='container'>
            <InnerContainer
                Arr={assignedTasks.todo}
                Heading={'Todo'}
                category={'todo'}
                isAssignedView={true}
            />
            <InnerContainer
                Arr={assignedTasks.inProgress}
                Heading={'In-Progress'}
                category={'inProgress'}
                isAssignedView={true}
            />
            <InnerContainer
                Arr={assignedTasks.completed}
                Heading={'Completed'}
                category={'completed'}
                isAssignedView={true}
            />
        </div>
    )
}

export default AssignedPage