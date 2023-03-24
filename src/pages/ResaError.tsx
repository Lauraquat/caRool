import { IonButton, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";


import "./style.css";

const ResaError: React.FC = () => {
    const navigate = useHistory();

  return (
    //Page de redirection après validation de la réservation
    <IonPage>
      <h1>Désolé, ce vélo n'est pas disponible pour la date choisie</h1>
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

export default ResaError;
