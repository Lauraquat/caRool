import './style.css';

import React, {useState, useEffect} from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebaseConfig';


const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            console.log('ok');
      })
      .catch((error) => {
        console.error(error);
        console.log('fonctionne pas')
      });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={(e) => {
            e.preventDefault();
            register()
        }}>
            <IonInput 
                placeholder='email' 
                onIonChange={(e:any) => setEmail(e.target.value)}/>
            <IonInput 
                type='password'
                placeholder='Password' 
                onIonChange={(e:any) => setPassword(e.target.value)}/>
            <IonInput 
                type='password'
                placeholder='Confirm Password'
                onIonChange={(e:any) => setCPassword(e.target.value)}/>
            <IonButton expand="full" type="submit">Register</IonButton>
        </form>
      <p>Already have an account?
        <Link to="/login">Login</Link>
      </p>
      </IonContent>
    </IonPage>
  )
}

export default Register; 