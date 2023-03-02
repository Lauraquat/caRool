import React from "react";
import "./style.css";
import { IonButton, IonPage, IonHeader, IonContent,IonToolbar } from "@ionic/react";
import { logOut } from "../hooks/LogOutHook";
import { useCurrentUser } from "../hooks/UserHook";


const User: React.FC = () => {
    const user = useCurrentUser();
    console.log(user?.email);

return(
    <IonPage>
        <IonHeader>
            <IonToolbar>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonButton onClick={logOut}>LogOut</IonButton>
        </IonContent>
    </IonPage>
)
}
export default User;