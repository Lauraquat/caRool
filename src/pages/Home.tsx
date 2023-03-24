import "./style.css";

import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const providerGoogle = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  function signInWithFacebook() {
    signInWithPopup(auth, providerFacebook)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        alert("Erreur lors de l'authentification avec facebook");
      });
  }
  function signInWithGoogle() {
    signInWithPopup(auth, providerGoogle)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        alert("Erreur lors de l'authentification avec google");
      });
  }
  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'authentification avec le mail");
      });
  }

  return (
    <IonPage>
      <IonHeader></IonHeader>
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
            Se connecter
          </IonButton>
        </form>
        <IonButton onClick={signInWithGoogle} expand="full" type="submit">
          Se connecter avec google
        </IonButton>
        <IonButton onClick={signInWithFacebook} expand="full" type="submit">
          Se connecter avec facebook
        </IonButton>
        <p>
          Pas encore inscrit ? <Link to="/register">S'inscrire</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
