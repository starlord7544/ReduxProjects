import React from 'react'
import { useSelector } from 'react-redux'
import InnerContainer from './InnerContainer'

const Container = () => {

	const { completed, inProgress, todo } = useSelector((state) => state.kanban)

	return (
		<div className='container'>
			<InnerContainer
				Arr={todo}
				Heading={'Todo'}
				category={'todo'}
			/>
			<InnerContainer
				Arr={inProgress}
				Heading={'In-Progress'}
				category={'inProgress'}
			/>
			<InnerContainer
				Arr={completed}
				Heading={'Completed'}
				category={'completed'}
			/>
		</div>
	)
}

export default Container