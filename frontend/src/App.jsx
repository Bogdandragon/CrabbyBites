import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Button from './components/Button/Button';

function App() {
  return (
    <div className="App">
      <h2>Test App</h2>
      <button onClick={
        async () => {
          axios.get('http://localhost:5000/api/auth/test')
          .then(response => alert(response.data))
          .catch(error => alert(error.message));
        }
      }>Click me!</button>
      <Button />
    </div>
  );
}

export default App;
