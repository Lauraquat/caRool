import { IonCard,IonHeader, IonContent, IonPage,IonBackButton, IonTitle, IonCardHeader,IonCardTitle,IonCardSubtitle, IonToolbar, IonButton, IonCardContent, IonList } from '@ionic/react';
import { collection, getDocs ,query, where , deleteDoc, doc} from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
import 'firebase/app';
import 'firebase/firestore';
import { dataReservations } from '../dataBdd';
import { useEffect, useState } from 'react';


import './style.css';
import { useCurrentUser } from '../hooks/UserHook';

const MesResa: React.FC = () => {
    const [reservations, setReservations] = useState<dataReservations[]>([]);
    const user = useCurrentUser();
    useEffect(() => {
        async function getReservations() {
            const reservationCol =collection(db, "reservation")
            const resaQuery = query(reservationCol, where("userId", "==", user?.uid || ""));
                const reservationSnapshot = await getDocs(resaQuery);
                const reservationLists = reservationSnapshot.docs.map( doc => {
                  const reservation = doc.data() as dataReservations;
                  reservation.id = doc.id;
                  return reservation;
                });
                return reservationLists ;
          }
          async function fetchReservations() {
            const reservations = await getReservations();
            // const usersBdd = await getUsers();
            setReservations(reservations);
            // setUsers(usersBdd);
          }
        fetchReservations();
      }, [user?.uid]);

    async function deleteResa(resaId : string){
        console.log(reservations)
        try {
            const resaRef = doc(db, "reservation", resaId);
            await deleteDoc(resaRef);
            // Mettre à jour les réservations après suppression
            const updatedReservations = reservations.filter((resa) => resa.id !== resaId);
            setReservations(updatedReservations);
            console.log("Réservation supprimée avec succès");
          } catch (error) {
            console.error("Erreur lors de la suppression de la réservation", error);
          }
    }

if( reservations.length === 0){
    return(
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButton slot="start"><IonBackButton defaultHref="/home"/></IonButton>
                <IonTitle></IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent id="contentTest" fullscreen>
            <p>
                Vous n'avez pas de reservation
            </p>
        </IonContent>
        </IonPage>
    
    )
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButton slot="start"><IonBackButton defaultHref="/home"/></IonButton>
            <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentTest" fullscreen>
      {reservations.map((reservation)=>  (
            <IonCard 
             key={reservation.id}
            >
                <IonCardHeader>
                  <IonCardTitle>{reservation.genre}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent >
                  {reservation.typeBike}
              </IonCardContent>
              <IonButton onClick={() => deleteResa(reservation.id)}>Supprimer la reservation</IonButton>  
            </IonCard>   
 
          ))}
      </IonContent>
    </IonPage>
  );
};

export default MesResa;




