import './App.css'
import { Container, LoginPage, RegisterPage, UserList } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'

function App() {

	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='' element={<Container />} />
						<Route path='login' element={<LoginPage />} />
						<Route path='register' element={<RegisterPage />} />
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
