import './App.css'
import { Header, InnerContainer, TaskInput } from './components'
import { useSelector } from 'react-redux'

function App() {

	const { completed, inProgress, todo } = useSelector((state) => state.kanban)

	return (
		<>
			<Header />
			{/* <Container /> */}
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
		</>
	)
}

export default App
