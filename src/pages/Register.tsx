import './style.css';

import React, {useState, useEffect} from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonToast} from '@ionic/react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc , doc, setDoc} from 'firebase/firestore/lite';
import { useCurrentUser } from '../hooks/UserHook';

const Register: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  const user = useCurrentUser();

  function register() {
    if(password === cpassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
              const user = userCredential.user;
              addUserRegister(user);
              // console.log(user);
        })
        .catch((error) => {
          console.error(error);
          console.log('fonctionne pas')
        });
    }else{
        setShowToast1(true)
    }

    async function addUserRegister(user:any) {
      try {
          console.log(user?.uid);
          if(user){
            console.log('ok')
            await setDoc(doc(db, "users", user.uid),{
              email,
            })
            console.log("Document written with ID: ", user.uid);
          }
        } catch (e) {
            console.error("Error adding document: ", e);

          
          // const res = await db.collection('cities').doc('LA').set({data})
          // const docRef = await addDoc(collection(db, "users"), {
          //     email,
          // });
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

