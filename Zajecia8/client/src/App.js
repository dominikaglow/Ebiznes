import './App.css';
import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Register</h1>
        <Routes>
          <Route path="/register" exact Component={Register} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
