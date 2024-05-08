import './App.css';
import Register from './Register';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" exact Component={Register} />
          <Route path="/login" exact Component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
