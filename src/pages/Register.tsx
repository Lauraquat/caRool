import './style.css';

import React, {useState, useEffect} from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonToast} from '@ionic/react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore/lite';


const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [showToast1, setShowToast1] = useState(false);

  function register() {
    if(password === cpassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
              const user = userCredential.user;
              addUserRegister();
              console.log(user);
        })
        .catch((error) => {
          console.error(error);
          console.log('fonctionne pas')
        });
    }else{
        setShowToast1(true)
    }

    async function addUserRegister() {
      try {
          const docRef = await addDoc(collection(db, "users"), {
              email,
          });
          console.log("Document written with ID: ", docRef.id);
      } catch (e) {
          console.error("Error adding document: ", e);
      }
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

