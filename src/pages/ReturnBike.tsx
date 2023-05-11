import { IonButton, IonPage, IonContent, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./style.css";

const ReturnBike: React.FC = () => {
  const navigate = useHistory();

  return (
    //Page de redirection après validation d'un QR code valide pour rendre le vélo
    <IonPage>
      <IonToolbar>Retour velo</IonToolbar>
      <IonContent>
        <section className="page-message">
        <p>
          Merci d'avoir utilisé caRool. Nous espérons que vous avez passé un bon
          moment et vous revoir bientôt !
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
        </section>
      </IonContent>
    </IonPage>
  );
};

export default ReturnBike;
