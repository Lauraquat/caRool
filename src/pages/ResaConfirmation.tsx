import { IonButton, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";


import "./style.css";

const ResaConfirmation: React.FC = () => {
    const navigate = useHistory();

  return (
    //Page de redirection après validation de la réservation
    <IonPage>
      <h1>Votre réservation a bien été prise en compte. À bientôt !</h1>
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

export default ResaConfirmation;
