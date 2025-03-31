import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InnerContainer from './InnerContainer'
import { setError, setTasks } from '../store/features/kanban/KanbanSlice'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const Container = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { currentUser, tasks } = useSelector((state) => state.kanban)

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const { data } = await api.getTasks(currentUser._id)
				// console.log(data.tasks)
				dispatch(setTasks(data.tasks))
			} catch (err) {
				dispatch(setError(err.response?.data?.message || 'Failed to load tasks'))
			}
		}
		if (currentUser && currentUser._id)
			fetchTasks()
		else {
			console.log(currentUser)
			navigate('/login')
		}
	}, [currentUser, dispatch])


	return (
		<div className='container'>
			<InnerContainer
				Arr={tasks.todo}
				Heading={'Todo'}
				category={'todo'}
			/>
			<InnerContainer
				Arr={tasks.inProgress}
				Heading={'In-Progress'}
				category={'inProgress'}
			/>
			<InnerContainer
				Arr={tasks.completed}
				Heading={'Completed'}
				category={'completed'}
			/>
		</div>
	)
}

export default Container