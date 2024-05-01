import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar/Navbar';
import Page from './components/Page/Page';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import theme from './components/Theme/Theme';
import HomePage from './components/HomePage/HomePage';
import AdminPage from './components/AdminPage/AdminPage';
import UserAdminPage from './components/UserAdminPage/UserAdminPage';
import RecipeAdminPage from './components/RecipeAdminPage/RecipeAdminPage';
import CommentAdminPage from './components/CommentAdminPage/CommentAdminPage';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';

function App() {
	// create routes for all components
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						{/* <Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/" element={<HomePage />} /> */}
						{/* <Route path="/" element={<UserAdminPage />} /> */}
						<Route path="/" element={<RecipeAdminPage />} />
						{/* <Route path="/" element={<UserAdminPage />} /> */}


					</Routes>
				</BrowserRouter>
			</div>
		</ChakraProvider>
	);
}

export default App;
