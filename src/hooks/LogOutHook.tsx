import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

export function logOut(){
    auth.signOut()
    .then(() => {
      console.log('Déconnecté avec succès');
      const navigate = useHistory();
      navigate.push("/");
    
      //todo: redirection vers la page de connexion
    })
    .catch((error) => {
      console.error(error);
    });
  }