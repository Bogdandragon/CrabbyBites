import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar/Navbar';
import Page from './components/Page/Page';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ForgotPasswordPage1 from './components/LoginPage/ForgotPasswordPage1';
import ForgotPasswordPage2 from './components/LoginPage/ForgotPasswordPage2';
import HomePage from './components/HomePage/HomePage';

import theme from './components/Theme/Theme';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';

function App() {
	// create routes for all components
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/forgot-password" element={<ForgotPasswordPage1 />} />
						<Route path="/" element={<ForgotPasswordPage2 />} />
						{/* <Route path="/" element={<HomePage />} /> */}
					</Routes>
				</BrowserRouter>
			</div>
		</ChakraProvider>
	);
}

export default App;
