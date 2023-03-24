import "./style.css";

import { IonButton, IonPage, IonContent, IonHeader } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { dataReservations } from "../dataBdd";
import React, { useState } from "react";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import "firebase/firestore";

const ScanOptions: React.FC = ({ route }: any) => {
  const navigate = useHistory();
  const location = useLocation<dataReservations>();
  const hashResa = location.state?.hashResa;

  function renderBike() {
    const retourVelo = query(
      collection(db, "reservation"),
      where("hashResa", "==", hashResa)
    );

    getDocs(retourVelo)
      .then((querySnapshot) => {
        const resaId = querySnapshot.docs[0].id;
        return updateDoc(doc(db, "reservation", resaId), "rendu", true);
      })
      .then(() => {
        "Votre vélo a bien été rendu";
      });
  }

  return (
    //Page de redirection après validation d'un QR code valide
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <h1>Vous pouvez accéder à votre réservation. Profitez bien !</h1>
        <IonButton
          onClick={(e) => {
            e.preventDefault();
            navigate.push("/scan");
          }}
        >
          Je viens chercher mon vélo
        </IonButton>
        <IonButton
          onClick={(e) => {
            renderBike();
            e.preventDefault();
            navigate.push("/retourVelo");
          }}
        >
          Je rends mon vélo
        </IonButton>

        <IonButton
          onClick={(e) => {
            e.preventDefault();
            navigate.push("/home");
          }}
        >
          Retourner à l'accueil
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ScanOptions;
