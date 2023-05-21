import "./style.css";

import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { dataBookings } from "../dataBdd";
import moment from "moment";
import { getAuth } from "@firebase/auth";

const Scan: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const navigate = useHistory();

  async function getBookings() {
    const bookingCol = collection(db, "booking");
    const bookingSnapshot = await getDocs(bookingCol);
    const bookingLists = bookingSnapshot.docs.map((doc) => {
      const booking = doc.data() as dataBookings;
      booking.id = doc.id;
      return booking;
    });
    return bookingLists;
  }

  //Affichage du scanner à QRcode
  async function startScan() {
    const auth = getAuth();
    const user = auth.currentUser;

    // Vérifie la permission de la caméra sur le mobile
    await BarcodeScanner.checkPermission({ force: true });

    // Affiche un background transparent
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // scanne et attend le résultat

    // Renvoie le résultat s'il existe (sinon renvoie une erreur)
    if (result.hasContent) {
      setQrCode(result.content ?? "Erreur de lecture du QRcode");

      const bookings = await getBookings();
      const today = moment().format("YYYY-MM-DD");

      //On cherche toutes les réservations qui ont une startDate correspondante à today
      const currentBooking = bookings.find((booking) => booking.startDate === today);

      // On vérifie s'il y a une réservation pour le user sur la journée
      if(
        currentBooking && 
        result.content == currentBooking.hashEnter &&        
        currentBooking.rendu == false){
        navigate.push("/scanOptions", { hashResa: currentBooking.hashResa });
      } else if (
        !currentBooking ||
        result.content != currentBooking.hashResa ||
        currentBooking.userId != user?.uid
      ) {
        navigate.push("/scanFailed");
      } else if (
        result.content == currentBooking.hashResa &&
        currentBooking.rendu == false &&
        currentBooking.userId == user?.uid
      ) {
        //On redirige vers la page des options
        navigate.push("/scanValid", { hashResa: currentBooking.hashResa });
      }
    }
  }

  useIonViewDidEnter(() => {
    startScan();
  });

  return (
    //Affiche le lecteur de QRcode
    <IonPage>
      <p>{qrCode}</p>
      <div className="scan-box"></div>
    </IonPage>
  );
};

export default Scan;
