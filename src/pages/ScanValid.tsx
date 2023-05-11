import { IonButton, IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
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
  const [rendu, setRendu] = useState(false);

  function renderBike() {
    const retourVelo = query(
      collection(db, "reservation"),
      where("hashResa", "==", hashResa)
    );

    console.log(retourVelo);

    getDocs(retourVelo)
      .then((querySnapshot) => {
        const resaId = querySnapshot.docs[0].id;

        console.log("resaId", resaId);

        return updateDoc(doc(db, "reservation", resaId), {
          rendu: true,
        });
      })
      .then(() => {
        "Votre vélo a bien été rendu";
      });
  }

  return (
    //Page de redirection après validation d'un QR code valide
    <IonPage>
      <IonToolbar></IonToolbar>
      <IonContent>
        <section className="page-message">
        <h1>Bienvenue</h1>
        <p>Vous pouvez accéder à votre réservation. Profitez bien !</p>

        <IonButton
          onClick={(e) => {
            e.preventDefault();
            navigate.push("/home");
          }}
        >
          Retourner à l'accueil
        </IonButton>
        <p>Hash de la réservation : {hashResa}</p>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default ScanOptions;
