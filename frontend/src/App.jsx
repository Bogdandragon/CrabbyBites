import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar/Navbar';
import Page from './components/Page/Page';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
		<Page>
			<h2>Test App</h2>
			<button onClick={
			async () => {
				axios.get('http://localhost:5000/api/auth/test')
				.then(response => alert(response.data))
				.catch(error => alert(error.message));
			}
			}>Click me!</button>
		</Page>
      </div>
    </ChakraProvider>
  );
}

export default App;
