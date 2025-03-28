import './App.css'
import { Header } from './components'
import { useSelector } from 'react-redux'
import Container from './components/Container'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Layout from './layout/Layout'
import RegisterPage from './components/RegisterPage'

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
