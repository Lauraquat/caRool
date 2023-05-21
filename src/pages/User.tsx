import "./style.css";
import {
  IonButton,
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

const User: React.FC = () => {
  const navigate = useHistory();

  function logOut() {
    auth
      .signOut()
      .then(() => {
        alert("Vous avez été déconnecté avec succès");
        navigate.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>User page</IonToolbar>
      </IonHeader>
      <IonContent>
        <section className="page-message">
          <img className="gif" src="../assets/icon/person-outline.svg" alt="" />
          <IonButton href="./myBooking">Voir mes réservations</IonButton>
          <IonButton onClick={logOut}>Se déconnecter</IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};
export default User;
