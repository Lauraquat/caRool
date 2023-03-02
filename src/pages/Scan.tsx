import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";

import "./style.css";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useHistory } from "react-router-dom";

const Scan: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const navigate = useHistory();

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
      //On redirige vers la page de confirmation
      navigate.push("/scanConfirmation");
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
