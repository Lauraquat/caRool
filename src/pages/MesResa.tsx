import {
  IonCard,
  IonHeader,
  IonContent,
  IonPage,
  IonBackButton,
  IonTitle,
  IonCardHeader,
  IonCardTitle,
  IonToolbar,
  IonButton,
  IonCardContent,
} from "@ionic/react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { dataReservations } from "../dataBdd";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/UserHook";
import "firebase/app";
import "firebase/firestore";

import "./style.css";

const MesResa: React.FC = () => {
  const [reservations, setReservations] = useState<dataReservations[]>([]);
  const user = useCurrentUser();
  useEffect(() => {
    //récupération des réservations par user
    async function getReservations() {
      const reservationCol = collection(db, "reservation");
      const resaQuery = query(
        reservationCol,
        where("userId", "==", user?.uid || "")
      );
      const reservationSnapshot = await getDocs(resaQuery);
      const reservationLists = reservationSnapshot.docs.map((doc) => {
        const reservation = doc.data() as dataReservations;
        reservation.id = doc.id;
        return reservation;
      });
      return reservationLists;
    }
    async function fetchReservations() {
      const reservations = await getReservations();
      setReservations(reservations);
    }
    fetchReservations();
  }, [user?.uid]);

  async function deleteResa(resaId: string) {
    try {
      const resaRef = doc(db, "reservation", resaId);
      await deleteDoc(resaRef);
      // Mise à jour des réservations après suppression
      const updatedReservations = reservations.filter(
        (resa) => resa.id !== resaId
      );
      setReservations(updatedReservations);
      alert("Réservation supprimée avec succès");
    } catch (error) {
      alert("Erreur lors de la suppression de la réservation");
    }
  }

  if (reservations.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButton>
            <IonTitle></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="contentTest" fullscreen>
          <p>Vous n'avez pas de réservation</p>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButton>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentTest" fullscreen>
        {reservations.map((reservation) => (
          <IonCard key={reservation.id}>
            <IonCardHeader>
              <IonCardTitle>Numéro de réservation : {reservation.id}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Type de vélo : {reservation.typeBike}</IonCardContent>
            <IonCardContent>Pour : {reservation.genre}</IonCardContent>
            <IonCardContent>Date de la réservation : {reservation.startDate}</IonCardContent>
            {/* <IonCardContent>Vélo rendu : {reservation.rendu}</IonCardContent> */}
            <IonButton onClick={() => deleteResa(reservation.id)}>
              Supprimer la réservation
            </IonButton>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MesResa;