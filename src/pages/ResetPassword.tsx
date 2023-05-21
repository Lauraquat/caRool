import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonImg,
  IonModal,
  IonText,
  IonButton,
} from "@ionic/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  function handleResetPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Succès : l'e-mail de réinitialisation du mot de passe a été envoyé
        setShowModal(true);
      })
      .catch((error) => {
        console.error(error);
        // Erreur : échec de l'envoi de l'e-mail de réinitialisation du mot de passe
        setErrorMessage("Email n'est pas enregistré.");
      });
  }

  function closeModal() {
    setShowModal(false);
    history.push("/"); // Redirection automatique vers la page de connexion
  }

  return (
    //Page de réinitialisation du mot de passe
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <section className="log-home">
          <IonImg
            class="logo-acceuil"
            src="../../assets/icon/logoWithTitle.svg"
            alt="logo ça Rool"
          ></IonImg>
          <h1 className="title-reset">Réinitialiser votre mot de passe</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <IonInput
              name="email"
              placeholder="Email"
              onIonChange={(e: any) => setEmail(e.target.value)}
            />
            <IonButton type="submit">Réinitialiser le mot de passe</IonButton>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Link to="/">SE CONNECTER</Link>

          <IonModal isOpen={showModal}>
            <IonContent>
              <div className="modal-password">
                <img src="../assets/icon/envoyer.png" alt="" />
                <IonText>
                  Votre e-mail de réinitialisation du mot de passe a été envoyé
                  avec succès.
                </IonText>
                <IonButton onClick={closeModal}>OK</IonButton>
              </div>
            </IonContent>
          </IonModal>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
