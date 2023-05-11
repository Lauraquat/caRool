import "./style.css";
import { IonButton, IonPage, IonContent, IonToolbar} from "@ionic/react";
import { useHistory } from "react-router-dom";

const ScanFailed: React.FC = () => {
  const navigate = useHistory();

  return (
    //Page de redirection après validation d'un QR code invalide
    <IonPage>
      <IonToolbar>
        Erreur
      </IonToolbar>
      <IonContent>
      <section className="page-message">
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
