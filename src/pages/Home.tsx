import "./style.css";

import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonToast,
} from "@ionic/react";

import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {hideTabBar} from "../App";

const Home: React.FC = () => {
  hideTabBar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast1, setShowToast1] = useState(false);

  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setShowToast1(true)
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
        <p>
          New here ? <Link to="/register">Register</Link>
        </p>
        <IonToast
          id="password"
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Votre mot de passe ou votre e-mail est incorrect"
          duration={2000}
        />
        </IonContent>
    </IonPage>
  );
};

export default Home;
