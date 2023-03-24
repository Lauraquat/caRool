import { IonButton, IonPage, IonHeader, IonContent} from "@ionic/react";
import { useHistory } from "react-router-dom";


import "./style.css";

const RetourVelo: React.FC = () => {
    const navigate = useHistory();

  return (
    //Page de redirection après validation d'un QR code valide
    <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent>
            <p>Merci d'avoir utiliser caRool nous esperons que vous avez passer un bon moment et vous revoir bientot bisous </p>
            <IonButton
                onClick={(e) => {
                e.preventDefault();
                navigate.push('/home');
                }}
            >
                Retourner à l'accueil
            </IonButton>
            <IonButton
                onClick={(e) => {
                e.preventDefault();
                navigate.push('/location');
                }}
            >
                Faire une nouvelle reservation
            </IonButton>
        </IonContent>
    </IonPage>
  );
};

export default RetourVelo;