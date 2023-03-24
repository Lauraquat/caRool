import { IonButton, IonPage, IonHeader, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./style.css";

const RetourVelo: React.FC = () => {
  const navigate = useHistory();

  return (
    //Page de redirection après validation d'un QR code valide pour rendre le vélo
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <p>
          Merci d'avoir utilisé caRool. Nous espérons que vous avez passé un bon
          moment et vous revoir bientôt ! Bisous {/***** VRAIMENT??? *****/}
        </p>
        <IonButton
          onClick={(e) => {
            e.preventDefault();
            navigate.push("/home");
          }}
        >
          Retourner à l'accueil
        </IonButton>
        <IonButton
          onClick={(e) => {
            e.preventDefault();
            navigate.push("/location");
          }}
        >
          Faire une nouvelle réservation
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RetourVelo;
