import { IonButton, IonPage, IonContent, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./style.css";

const ScanFailed: React.FC = () => {
  const navigate = useHistory();

  return (
    //Page de redirection après validation d'un QR code invalide
    <IonPage>
      <IonToolbar>Erreur</IonToolbar>
      <IonContent>
        <section className="page-message">
          <img className="gif" src="../assets/gif/icons8-cross.gif" alt="" />
          <h1>Nous n'avons pas de réservation active ce jour</h1>
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

export default ScanFailed;
