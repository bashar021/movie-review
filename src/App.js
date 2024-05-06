
import './App.css';
import Homepage from './components/Homepage.js'
// import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import {Route,BrowserRouter as Router ,Routes} from "react-router-dom"
import LoginSignup from './components/LoginSignup.js';
import User from './components/User.js'
function App() {
  return (
    // <Homepage></Homepage>
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/signup'element={<LoginSignup ></LoginSignup>} ></Route>
        <Route path='/login' element={<LoginSignup></LoginSignup>} ></Route>
        <Route path='/user' element={<User></User>}></Route>
        {/* <Route></Route> */}
      </Routes>

    </Router>

    // <Homepage></Homepage>

  );
}

export default App;
