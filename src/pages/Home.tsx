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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {hideTabBar, showTabBar} from "../App";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {

  hideTabBar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast1, setShowToast1] = useState(false);
  const navigate = useHistory();

  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate.push('/event');
        showTabBar();
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
        </IonContent>
    </IonPage>
  );
};

export default Home;
