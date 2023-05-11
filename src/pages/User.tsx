import React from "react";
import "./style.css";
import { IonButton, IonPage, IonHeader, IonContent,IonToolbar , IonList} from "@ionic/react";
import { useCurrentUser } from "../hooks/UserHook";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";


const User: React.FC = () => {
    const navigate = useHistory();

    function logOut(){
        auth.signOut()
        .then(() => {
            //todo: redirection vers la page de connexion
            console.log('Déconnecté avec succès');
            navigate.push("/");
        })
        .catch((error) => {
        console.error(error);
        });
    }

  
return(
    <IonPage>
        <IonHeader>
            <IonToolbar>
                User page
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <section className="page-message">
            <IonList>
            <IonButton href="./mesresa">Voir mes reservations</IonButton>
            <IonButton onClick={logOut}>LogOut</IonButton>
            </IonList>
            </section>

        </IonContent>
    </IonPage>
)
}
export default User;