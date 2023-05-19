import { IonButton, IonPage, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { dataBookings } from "../dataBdd";
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
  const location = useLocation<dataBookings>();
  const hashResa = location.state?.hashResa;
  const [rendu, setRendu] = useState(false);

  function renderBike() {
    const returnBike = query(
      collection(db, "reservation"),
      where("hashResa", "==", hashResa)
    );

    console.log(returnBike);

    getDocs(returnBike)
      .then((querySnapshot) => {
        const bookingId = querySnapshot.docs[0].id;

        console.log("bookingId", bookingId);

        return updateDoc(doc(db, "reservation", bookingId), {
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
      <IonToolbar>
        Scan valide
      </IonToolbar>
      <IonContent>
        <section className="page-message">
        <img className="gif" src="../assets/gif/icons8-check.gif" alt="" />
        <h1>Vous pouvez accéder à votre réservation. <br/> Profitez bien !</h1>
        <IonButton
          onClick={(e) => {
            e.preventDefault();
            navigate.push("/home");
          }}
        >
          Retourner à l'accueil
        </IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default ScanOptions;
