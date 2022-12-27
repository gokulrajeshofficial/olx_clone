import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router ,Route} from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebase/config';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Create from './Pages/Create'
import LoginPage from './Pages/Login';
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext'
function App() {
  const auth = getAuth(app);
  const { setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext) 

  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      setUser(user);
      })
    
  })
  return (
    <div>
      <Post>
      <Router>
        <Route exact path='/'>
        <Home />
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/login'>
          <LoginPage/>
        </Route>
        <Route path = '/create'>
          <Create/>
        </Route>
        <Route path = '/view'>
          <View/>
        </Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
