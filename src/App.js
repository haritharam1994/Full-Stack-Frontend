import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import { Link } from 'react-router-dom';
import Createpost from './pages/Createpost'
import Post from './pages/Post'
import Registraion from './pages/Registraion'
import Login from './pages/Login'
import {AuthContext} from'./helpers/AuthContext'
import { useState, useEffect } from "react"
import axios from "axios";


function App() {

  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth",
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);


  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
       <BrowserRouter >
      <div className='navbar'>
        
         <Link to="/">Home Page</Link>
         <Link to="/createpost">Create A Post</Link>
         {!authState ?  (
          <>
            <Link to="/login">Login</Link>
           <Link to="/registration">Registration</Link>
          </>
        ) :(
          <Link to="/login">Logout</Link>
        )}
      </div>
    <Routes>
      <Route path='/'element={<Home/>}></Route>
      <Route path='/createpost'element={<Createpost/>}></Route>
      <Route path='/post/:id'element={<Post/>}></Route>
      <Route path='/registration'element={<Registraion/>}></Route>
      <Route path='/login'element={<Login/>}></Route>
    </Routes>
      
    </BrowserRouter>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
