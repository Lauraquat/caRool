import {
  IonCard,
  IonHeader,
  IonContent,
  IonPage,
  IonCardHeader,
  IonCardTitle,
  IonToolbar,
  IonButton,
  IonCardContent,
  IonList,
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
import "firebase/app";
import "firebase/firestore";
import { dataBookings } from "../dataBdd";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/UserHook";
import { useHistory } from "react-router";

import "./style.css";

const MyBooking: React.FC = () => {
  const navigate = useHistory();
  const [bookings, setBookings] = useState<dataBookings[]>([]);
  const user = useCurrentUser();
  useEffect(() => {
    async function getBookings() {
      const bookingCol = collection(db, "booking");
      const bookingQuery = query(
        bookingCol,
        where("userId", "==", user?.uid || ""), where("rendu", "==", false)
      );
      const bookingSnapshot = await getDocs(bookingQuery);
      const bookingLists = bookingSnapshot.docs.map((doc) => {
        const booking = doc.data() as dataBookings;
        booking.id = doc.id;
        return booking;
      });
      return bookingLists;
    }
    async function fetchBookings() {
      const bookings = await getBookings();
      setBookings(bookings);
    }
    fetchBookings();
  }, [user?.uid]);

  //Fonction de suppression de réservation
  async function deleteBooking(bookingId: string) {
    try {
      const bookingRef = doc(db, "booking", bookingId);
      await deleteDoc(bookingRef);
      // Mise à jour des réservations après suppression
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation", error);
    }
  }
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    return `${day} ${months[monthIndex]} ${year}`;
  }

  //Page d'affichage des réservations
  if (bookings.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>Mes réservations</IonToolbar>
        </IonHeader>
        <IonContent id="contentTest" fullscreen>
          <section className="page-message">
            <img className="gif" src="../assets/gif/icons8-cross.gif" alt="" />
            <h1>Vous n'avez pas de réservation</h1>
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
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>Mes réservations</IonToolbar>
      </IonHeader>
      <IonContent id="content-booking" fullscreen>
        <h1>Mes réservations</h1>
        <IonList class="py-1">
          {bookings.map((booking) => (
            <IonCard key={booking.id}>
              <IonCardHeader>
                <IonCardTitle>
                  {" "}
                  Réservation du {formatDate(booking.startDate)}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Type de vélo : {booking.typeBike}
                <br />
                Vélo pour {booking.genre}
              </IonCardContent>
              <IonButton onClick={() => deleteBooking(booking.id)}>
                Supprimer la réservation
              </IonButton>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyBooking;
