import "./style.css";

import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logIn();
          }}
        >
          <IonInput
            name="username"
            placeholder="Username"
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
      </IonContent>
      <p>
        New here ?<Link to="/register">register</Link>
      </p>
    </IonPage>
  );
};

export default Login;
