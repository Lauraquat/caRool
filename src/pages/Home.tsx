import "./style.css";

import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonImg
} from "@ionic/react";

import { Link } from "react-router-dom";
import { GoogleAuthProvider,FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore/lite';
import { useCurrentUser } from "../hooks/UserHook";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const providerGoogle = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  function signInWithFacebook(){
    signInWithPopup( auth, providerFacebook)
    .then(() => {
    })
    .catch((error) => {
      console.log("echec");
    })
   }
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
        <section className="log-home">

        <IonImg class='logo-acceuil' src='../../assets/icon/logoWithTitle.svg' alt='logo ça Rool'></IonImg>           
        <h1 className="title-log">Bienvenue</h1>
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
          <IonButton type="submit">
            SE CONNECTER
          </IonButton>
        </form>
        <Link to="/register">S'INSCRIRE</Link>
        <p>Se connecter avec :</p>
        <button onClick={signInWithGoogle} type="submit" id="google-button">
          <img src="../../assets/icon/google.png" alt="se connecter avec google" />
        </button>
        {/* <IonButton onClick={signInWithFacebook} expand="full" type="submit">
          Se connecter avec facebook
        </IonButton> */}
        </section>
        </IonContent>
    </IonPage>
  );
};

export default Home;
