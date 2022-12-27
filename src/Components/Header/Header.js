import React,{useContext} from 'react';
import { getAuth, signOut } from "firebase/auth";

import './Header.css';
import {useHistory} from 'react-router-dom';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import app from '../../firebase/config'
function Header() {
  const {user} = useContext(AuthContext)
  const history = useHistory()
const logoutFUnction = ()=>{
const auth = getAuth(app);
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{ history.push('/login')}}>{user  ? user.username : 'Login'}</span>
          
          
      
          <hr />
          
        </div>
        <span onClick={logoutFUnction}>{user ? 'logout' : ''}</span>

        <div className="sellMenu" onClick={(e)=>{user ? history.push('/create') : history.push('/login')}}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
