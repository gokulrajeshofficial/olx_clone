import React, { Fragment, useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import app, { db } from '../../firebase/config';

const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const history = useHistory();
  let ts = Date.now();

  let date_ob = new Date(ts);
  let dates = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  
  // prints date & time in YYYY-MM-DD format
  let date = (year + "-" + month + "-" + dates);
  const handleSubmit = () => {
    const storage = getStorage();
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, `/image/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          console.log('File available at', downloadURL);
          var ref = collection(db,'products')
          const docRef = await addDoc(
          ref,{
            name:name,
            price:price,
            category: category,
            imageurl:downloadURL,
            userId:user.uid,
            createdAt: date.toString()
          }
          ).then(()=>{
            history.push('/')
          }).catch((error)=>{
          alert('unsuccessuful operation, error:'+error)
          })
        })
      }
    );
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => { setName(e.target.value) }}
          
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => { setCategory(e.target.value) }}
            name="category"
      
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price"
            onChange={(e) => { setPrice(e.target.value) }} />
          <br />
          <br />
          <img src={image ? URL.createObjectURL(image) : ''} alt="Posts" width="200px" height="200px" ></img>

          <br />
          <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
