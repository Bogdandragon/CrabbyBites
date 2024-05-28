import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import AddRecipePage from './components/AddRecipePage/AddRecipePage';
import theme from './components/Theme/Theme';
import RecipePage from './components/RecipePage/RecipePage';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import RecipeFinderPage from './components/RecipeFinderPage/RecipeFinderPage';
import AdminPage from './components/AdminPage/AdminPage';
import MyFridgePage from './components/MyFridgePage/MyFridgePage';

function App() {
	// create routes for all components
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/admin/:type" element={<AdminPage />} />
						<Route path="/add-recipe" element={<AddRecipePage />} />
						<Route path="/recipes/:id" element={<RecipePage />} />
						<Route path="/recipe-finder" element={<RecipeFinderPage />} />
						<Route path="/my-fridge" element={<MyFridgePage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ChakraProvider>
	);
}

export default App;
