import { IonButton, IonPage, IonContent, IonHeader } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { dataReservations } from "../dataBdd";
import React, { useEffect, useState } from "react";

import "./style.css";
import "firebase/firestore";
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore/lite";

import { db } from "../firebaseConfig";

const ScanOptions: React.FC = ({ route }: any) => {
  //si trouve pas route l'ajouter quelque pars dans app.tsx
  const navigate = useHistory();
  const location = useLocation<dataReservations>();
  const hashResa = location.state?.hashResa;
  const [rendu, setRendu] = useState(false);

  function renderBike() {

    // console.log("db", db);   //OK
    
    const retourVelo = query(
      collection(db, "reservation"),
      where("hashResa", "==", hashResa)
    );

    // console.log("retour");  //ko


    getDocs(retourVelo)
      .then((querySnapshot) => {
        const resaId = querySnapshot.docs[0].id;

        console.log("resaId", resaId);

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
        <p>Hash de la réservation : {hashResa}</p>
      </IonContent>
    </IonPage>
  );
};

export default ScanOptions;
