import { IonButton, IonPage, IonContent, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { dataBookings } from "../dataBdd";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { useCurrentUser } from "../hooks/UserHook";

import "./style.css";

const BookingConfirmation: React.FC = () => {
  const navigate = useHistory();
  const [bookings, setBookings] = useState<dataBookings[]>([]);
  const user = useCurrentUser();
  useEffect(() => {
    async function getBookings() {
      const bookingCol = collection(db, "booking");
      const bookingQuery = query(
        bookingCol,
        where("userId", "==", user?.uid || "")
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

  return (
    //Page de redirection après validation de la réservation
    <IonPage>
      <IonToolbar>Booking</IonToolbar>
      <img src="../assets/gif/check.gif" alt="" />
      <IonContent>
        <section className="page-message">
          <img className="gif" src="../assets/gif/icons8-check.gif" alt="" />
          <h1>
            Votre réservation a bien été prise en compte.
            <br /> À très vite !
          </h1>
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

export default BookingConfirmation;
