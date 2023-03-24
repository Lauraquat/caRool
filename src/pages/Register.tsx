import "./style.css";

import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonToast,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore/lite";
import { useCurrentUser } from "../hooks/UserHook";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [showToast1, setShowToast1] = useState(false);

  function register() {
    if (password === cpassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          addUserRegister(user);
        })
        .catch((error) => {
          console.error(error);
          alert("Erreur lors de l'inscription");
        });
    } else {
      setShowToast1(true);
    }

    async function addUserRegister(user: any) {
      try {
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            email,
          });
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <IonInput
            placeholder="Email"
            onIonChange={(e: any) => setEmail(e.target.value)}
          />
          <IonInput
            type="password"
            placeholder="Mot de passe"
            onIonChange={(e: any) => setPassword(e.target.value)}
          />
          <IonInput
            type="password"
            placeholder="Confirmer le mot de passe"
            onIonChange={(e: any) => setCPassword(e.target.value)}
          />
          <IonButton expand="full" type="submit">
            S'inscrire
          </IonButton>
        </form>
        <p>
          Déjà inscrit ?<Link to="/home">Se connecter</Link>
        </p>
      </IonContent>
      <IonToast
        id="password"
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Votre mot de passe est différent de la confirmation"
        duration={2000}
      />
    </IonPage>
  );
};

export default Register;
