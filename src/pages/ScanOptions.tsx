import { IonButton, IonPage, IonContent, IonHeader } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { dataReservations } from "../dataBdd";

import "./style.css";

const ScanOptions: React.FC = ({route}:any) => {
    //si trouve pas route l'ajouter quelque pars dans app.tsx
    const navigate = useHistory();
    const location = useLocation<dataReservations>(); 
    const hashResa = location.state?.hashResa;

  return (
    //Page de redirection après validation d'un QR code valide
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
      <h1>Vous pouvez accéder à votre réservation. Profitez bien !</h1>
      <IonButton
        onClick={(e) => {
          e.preventDefault();
          navigate.push('/scan');
        }}
      >
        Je viens chercher mon vélo
      </IonButton>
      <IonButton
        onClick={(e) => {
          e.preventDefault();
          navigate.push('/retourVelo');
        }}
      >
        Je rend mon vélo
      </IonButton>

      <IonButton
        onClick={(e) => {
          e.preventDefault();
          navigate.push('/home');
        }}
      >
        Retourner à l'accueil
      </IonButton>
      <p>Hash de la réservation : {hashResa}</p>
      </IonContent>
    </IonPage>
  );
};

export default ScanOptions;