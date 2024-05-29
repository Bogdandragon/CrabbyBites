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
import AddRecipePage from './components/AddRecipePage/AddRecipePage';
import theme from './components/Theme/Theme';
import RecipePage from './components/RecipePage/RecipePage';
import CommentAdminPage from './components/CommentAdminPage/CommentAdminPage'
import RecipeAdminPage from './components/RecipeAdminPage/RecipeAdminPage'
import UserAdminPage from './components/UserAdminPage/UserAdminPage'
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
	// create routes for all components
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						{/* <Route path="/" element={<HomePage />} /> */}
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/add-recipe" element={<AddRecipePage />} />
						<Route path="/add" element={<AddRecipePage />} />
						<Route path="/forgot-password" element={<ForgotPasswordPage1 />} />
						<Route path="/forgot-password2" element={<ForgotPasswordPage2 />} />
						<Route path="/recipes/:id" element={<RecipePage />} />
						<Route path="/admin/:type" element={<AdminPage />} />
						<Route path="/*" element={<ProfilePage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ChakraProvider>
	);
}

export default App;
