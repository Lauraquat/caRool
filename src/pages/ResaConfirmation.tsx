import { IonButton, IonPage, IonContent, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./style.css";
import { useEffect, useState } from "react";
import { dataReservations } from "../dataBdd";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { useCurrentUser } from '../hooks/UserHook';

const ResaConfirmation: React.FC = () => {
    const navigate = useHistory();
    const [reservations, setReservations] = useState<dataReservations[]>([]);
    const user = useCurrentUser();
    useEffect(() => {
        async function getReservations() {
            const reservationCol =collection(db, "reservation")
            const resaQuery = query(reservationCol, where("userId", "==", user?.uid || ""));
                const reservationSnapshot = await getDocs(resaQuery);
                const reservationLists = reservationSnapshot.docs.map( doc => {
                  const reservation = doc.data() as dataReservations;
                  reservation.id = doc.id;
                  return reservation;
                });
                return reservationLists ;
          }
          async function fetchReservations() {
            const reservations = await getReservations();
            // const usersBdd = await getUsers();
            setReservations(reservations);
            // setUsers(usersBdd);
          }
        fetchReservations();
      }, [user?.uid]);


  return (
    //Page de redirection après validation de la réservation
    <IonPage>
      <IonToolbar>
        Reservation
      </IonToolbar>
        <IonContent >
          <section className="page-message">

        <h1>Votre réservation à bien été prise en compte. À très vite !</h1>

      <IonButton
        onClick={(e) => {
          e.preventDefault();
          navigate.push('/mesresa');
        }}
        >
        Mes réservations
      </IonButton>
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

export default ResaConfirmation;
