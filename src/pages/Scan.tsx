import "./style.css";

import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { dataReservations } from "../dataBdd";
import moment from "moment";
import { getAuth } from "@firebase/auth";

const Scan: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const navigate = useHistory();

  async function getResas() {
    const resaCol = collection(db, "reservation");
    const resaSnapshot = await getDocs(resaCol);
    const resaLists = resaSnapshot.docs.map((doc) => {
      const resa = doc.data() as dataReservations;
      resa.id = doc.id;
      return resa;
    });
    return resaLists;
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

      const resas = await getResas();
      const today = moment().format("YYYY-MM-DD");

      //On cherche toutes les réservations qui ont une startDate correspondante à today
      const currentResa = resas.find((resa) => resa.startDate === today);

      // On vérifie s'il y a une réservation pour le user sur la journée
      if(
        currentResa && 
        result.content == currentResa.hashEnter &&        
        currentResa.rendu == false){
        navigate.push("/scanOptions", { hashResa: currentResa.hashResa });
      } else if (
        !currentResa ||
        result.content != currentResa.hashResa ||
        currentResa.userId != user?.uid
      ) {
        navigate.push("/scanFailed");
      } else if (
        result.content == currentResa.hashResa &&
        currentResa.rendu == false &&
        currentResa.userId == user?.uid
      ) {
        //On redirige vers la page des options
        navigate.push("/scanValid", { hashResa: currentResa.hashResa });
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
