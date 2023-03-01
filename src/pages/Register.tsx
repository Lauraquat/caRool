import './style.css';

import React, {useState, useEffect} from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonToast} from '@ionic/react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebaseConfig';
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  const navigate = useHistory();

  function register() {
    if(password === cpassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
              navigate.push('/login')
        })
        .catch((error) => {
          console.error(error);
          console.log('fonctionne pas')
        });
    }else{
        setShowToast1(true)
    }

}    
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent>
        <form onSubmit={(e) => {
            e.preventDefault();
            register()
        }}>
            <IonInput 
                placeholder='Email' 
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
        <Link to="/home">Login</Link>
      </p>
      </IonContent>
      <IonToast
        id="password"
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Votre mot de passe est diférant"
        duration={2000}
      />
    </IonPage>
  )
}

export default Register; 