import React, { useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';

import Logo from '../../olx-logo.png';
import {FirebaseContext} from '../../store/Context';

import './Signup.css';

import { collection, addDoc } from "firebase/firestore"; 

import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import app,{db} from '../../firebase/config';


export default function Signup() {
  const history = useHistory()
  const [username , setUsername] = useState('')
  const [email , setEmail] = useState('')
  const [phone , setPhone] = useState('')
  const [password , setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const auth = getAuth(firebase);
//to create an account  
     createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          const user = userCredential.user;
          const docRef = await addDoc(collection(db, "users"), {
            id:user.uid,
            username: username,
            email: email,
            phone: phone
          }).then(()=>{
            history.push('/login')
          })

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert(errorMessage)
          // const myArray = errorMessage.split(":");
          // document.getElementById('errMsg').innerHTML = myArray[1];
        });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}

            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{history.push('/login')}}>Login</a>
      </div>
    </div>
  );
}
