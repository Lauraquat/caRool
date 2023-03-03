import { IonButton, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";


import "./style.css";

const ScanOptions: React.FC = () => {
    const navigate = useHistory();

  return (
    //Page de redirection après validation d'un QR code valide
    <IonPage>
      <h1>Vous pouvez accéder à votre réservation. Profitez bien !</h1>
      <IonButton
        onClick={(e) => {
          e.preventDefault();
          navigate.push('/home');
        }}
      >
        Retourner à l'accueil
      </IonButton>
    </IonPage>
  );
};

export default ScanOptions;