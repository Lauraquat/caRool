import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useEffect, useState } from "react";

import "./style.css";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { dataCodes } from "../dataBdd";

const Scan: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const navigate = useHistory();

  const [codes, setCodes] = useState<dataCodes[]>([]);

  async function getCodes() {
    const codeCol = collection(db, "codeHash");
    const codeSnapshot = await getDocs(codeCol);
    const codeLists = codeSnapshot.docs.map((doc) => {
      const code = doc.data() as dataCodes;
      code.id = doc.id;
      return code;
    });
    return codeLists;
  }

  useEffect(() => {
    async function fetchCodes() {
      const codes = await getCodes();
      setCodes(codes);
    }
    fetchCodes();
  }, []);

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

      // console.log(codes[0].code);

      // if(result.content ==  codes[id].code){
      // if("test2" ==  codes[0].code){
      //   //On redirige vers la page de confirmation
      //   navigate.push("/scanConfirmation");
      // }
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
