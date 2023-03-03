import { IonCard,IonHeader, IonContent, IonPage,IonBackButton, IonTitle, IonCardHeader,IonCardTitle,IonCardSubtitle, IonToolbar, IonButton, IonCardContent, IonList } from '@ionic/react';
import { collection, getDocs ,query, where } from 'firebase/firestore/lite';
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
             routerLink={`/event/${reservation.id}`}
            >
                <p>{reservation.quantite}</p>
                <IonCardHeader>
                  <IonCardTitle>{reservation.genre}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent >
                  {reservation.typeBike}
              </IonCardContent>
            </IonCard>      
          ))}
      </IonContent>
    </IonPage>
  );
};

export default MesResa;




