import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";

import "./style.css";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Adresse e-mail ou mot de passe incorrect");
      });
  }

  return (
    //Page d'accueil
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <section className="log-home">
          <IonImg
            class="logo-acceuil"
            src="../../assets/icon/logoWithTitle.svg"
            alt="logo ça Rool"
          ></IonImg>
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
            <div className="password-input">
              <IonInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
              <IonIcon
                className="password-toggle-icon"
                icon={showPassword ? eyeOffOutline : eyeOutline}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <IonButton type="submit">SE CONNECTER</IonButton>
            <Link to="/resetPassword">Mot de passe oublié ?</Link>
          </form>
          <Link to="/register">S'INSCRIRE</Link>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
