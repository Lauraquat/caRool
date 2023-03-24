import { IonButton, IonPage, IonContent, IonHeader } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./style.css";

const ScanOptions: React.FC = ({route}:any) => {
    const {hashResa} = route.params
    //si trouve pas route l'ajouter quelque pars dans app.tsx
    const navigate = useHistory();
    console.log(hashResa);

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
      </IonContent>
    </IonPage>
  );
};

export default ScanOptions;