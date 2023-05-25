import { IonButton, IonPage, IonContent, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import React from "react";
import "firebase/firestore";

const ScanValid: React.FC = ({ route }: any) => {
  const navigate = useHistory();

  return (
    //Page de redirection après validation d'un QR code valide
    <IonPage>
      <IonToolbar>Scan valide</IonToolbar>
      <IonContent>
        <section className="page-message">
          <img className="gif" src="../assets/gif/icons8-check.gif" alt="" />
          <h1>
            Vous pouvez accéder à votre réservation. <br /> Profitez bien !
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

export default ScanValid;
