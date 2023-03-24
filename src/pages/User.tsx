import "./style.css";

import React from "react";
import {
  IonButton,
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

const User: React.FC = () => {
  const navigate = useHistory();

  function logOut() {
    auth
      .signOut()
      .then(() => {
        alert("Vous avez été déconnecté avec succès");
        navigate.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton href="./mesresa">Voir mes réservations</IonButton>
        <IonButton onClick={logOut}>Se déconnecter</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default User;