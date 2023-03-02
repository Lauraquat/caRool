import "./style.css";

import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
} from "@ionic/react";

import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useHistory();
  const providerGoogle = new GoogleAuthProvider();
  function signInWithGoogle(){
    signInWithPopup( auth, providerGoogle)
    .then(() => {
    })
    .catch((error) => {
      console.log("echec");
    })
   }
  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        //todo setuser in bdd
      })
      .catch((error) => {
        console.error(error);
        console.log('fonctionne pas');
      });
  }
 
  

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logIn();
          }}
        >
          <IonInput
            name="email"
            placeholder="Email"
            onIonChange={(e: any) => setEmail(e.target.value)}
          />
          <IonInput
            name="password"
            type="password"
            placeholder="Password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          />
          <IonButton expand="full" type="submit">
            Login
          </IonButton>
        </form>
        <IonButton onClick={signInWithGoogle} expand="full" type="submit">
            Se connecter avec google
          </IonButton>
        <p>
          New here ? <Link to="/register">Register</Link>
        </p>
        </IonContent>
    </IonPage>
  );
};

export default Home;
