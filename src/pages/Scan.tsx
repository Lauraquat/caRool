import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";

import "./style.css";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { dataReservations } from "../dataBdd";
import { isEmpty } from "@firebase/util";
import moment from "moment";

const Scan: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const navigate = useHistory();

  async function getResas() {
    const resaCol = collection(db, "reservation");
    const resaSnapshot = await getDocs(resaCol);
    const resaLists = resaSnapshot.docs.map((doc) => {
      const resa = doc.data() as dataReservations;
      resa.userId = doc.id;
      return resa;
    });
    return resaLists;
  }

  async function startScan() {
    // Vérifie la permission de la caméra sur le mobile
    await BarcodeScanner.checkPermission({ force: true });

    // Affiche un background transparent
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // scanne et attend le résultat

    // Renvoie le résultat s'il existe (sinon renvoie une erreur)
    if (result.hasContent) {
      setQrCode(result.content ?? "Erreur de lecture du QRcode");
      console.log(result.content); //TODO vérifier que le contenu correspond à ce qu'on a généré en base lors de la réservation

      const resas = await getResas();

      const array = resas.map((resa) => {
        const startDate = moment(resa.startDate).format("YYYY-MM-DD");
        const today = moment().format("YYYY-MM-DD");

        if (startDate === today /* && ("test2" ==  resa.code) */) {
          //On redirige vers la page de confirmation
          navigate.push("/scanConfirmation");
        }
      });

      if (isEmpty(array)) {
        console.log("il n'a pas de réservation pour ce jour");
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
