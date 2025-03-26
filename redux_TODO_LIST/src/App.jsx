import { useState } from 'react'
import './App.css'
import { Header } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, toggleTask, editTask } from './store/TodoSlice'
import EditSvg from './assets/edit.svg'
import DeleteSvg from './assets/delete.svg'


function App() {
	const dispatch = useDispatch()
	const taskArr = useSelector((state) => state.todos.taskArr)
	const [isEditing, setIsEditing] = useState('')
	const [text, setText] = useState('')

	const completedTasks = taskArr.filter(ele => ele.isChecked === true)
	const pendingTasks = taskArr.filter(ele => ele.isChecked !== true)

	const newTaskArr = [...pendingTasks, ...completedTasks]
	return (
		<>
			<Header />
			{
				taskArr.length > 0 &&
				<div className="container">
					<ul>
						{
							newTaskArr.map(task => (
								<li key={task.id}>
									<input type="checkbox" checked={task.isChecked} onChange={() => dispatch(toggleTask(task.id))} />
									{
										isEditing === task.id ? (
											<input
												type='text'
												value={text}
												onChange={(e) => setText(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														setIsEditing('')
														setText('')
														dispatch(editTask({ content: text, id: task.id, time: Date.now() }))
														return
													}
												}}
												autoFocus
											/>
										) : (
											<span>{task.content}</span>
										)
									}
									<button
										className='delete-btn'
										onClick={() => dispatch(deleteTask(task.id))}
									>
										<img src={DeleteSvg} alt="Del" />
									</button>
									{
										isEditing === task.id ? (
											<button
												onClick={() => {
													setIsEditing('')
													console.log(text)
													setText('')
													dispatch(editTask({ content: text, id: task.id }))
												}}>
												Submit
											</button>
										) : (
											<button
												className='edit-btn'
												disabled={isEditing !== ''}
												onClick={() => {
													setText(task.content)
													setIsEditing(task.id)
												}}>
												<img src={EditSvg} alt="Edit" />
											</button>
										)
									}
								</li>
							))
						}
					</ul>
				</div>
			}
		</>
	)
}

export default App
