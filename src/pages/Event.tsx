import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonCardHeader,IonCardTitle,IonCardSubtitle, IonToolbar, IonButton, IonCardContent, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';
import { collection, getDocs , addDoc} from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
import 'firebase/app';
import 'firebase/firestore';
import { dataEvents, dataUsers } from '../dataBdd';

import './style.css';
import { useCurrentUser } from '../hooks/UserHook';

const Event: React.FC = () => {
  // const user = useCurrentUser();

  const [events, setEvents] = useState<dataEvents[]>([]);
  const [usersBdd, setUsers] = useState<dataUsers[]>([]);
  
    async function getEvents() {
      const eventCol = collection(db, 'event');
      const eventSnapshot = await getDocs(eventCol);
      const eventLists = eventSnapshot.docs.map( doc => {
        const event = doc.data() as dataEvents;
        event.id = doc.id;
        return event;
      });
      return eventLists ;
    }
    useEffect(() => {
      async function fetchEvents() {
        const events = await getEvents();
        // const usersBdd = await getUsers();
        setEvents(events);
        // setUsers(usersBdd);
      }

      fetchEvents();
    }, []);

    // useEffect(() => {
    //     const verifMail = usersBdd.some( (element) => element.email === user?.email && element.email !== null);

    //     if(verifMail === false && user){
    //       addUserInBdd();
    //     }
        
    // }, [user, usersBdd])

    // async function getUsers(){
    //   const userCol = collection(db, 'users');
    //   const userSnapshot = await getDocs(userCol);
    //   const userbddLists = userSnapshot.docs.map( doc => {
    //     const userBdd = doc.data() as dataUsers;
    //     userBdd.id = doc.id;
    //     return userBdd;
    //   });
    //   return userbddLists;
    // }

    //useCallBack() à regarder
    // async function addUserInBdd() {
    //   try {
    //       const docRef = await addDoc(collection(db, "users"), {
    //       email : user?.email,
    //      });
    //       console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //       console.error("Error adding document: ", e);
    //   }
    // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  fullscreen>
          <IonButton class='mt-1 py-1'>Réserver un vélo</IonButton>
            <IonToolbar>
              <IonTitle class='py-1' >Évènement à venir</IonTitle>
            </IonToolbar>
        <IonList class='py-1'>
          {events.map((event)=>  (
            <IonCard key={event.id} routerLink={`/event/${event.id}`}>
                <img src={event.photo} alt=''></img>
                <IonCardHeader>
                  <IonCardTitle>{event.titre}</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent >
                  {event.description}
                <IonButton class='cardButton'>En savoir +</IonButton>
              </IonCardContent>
            </IonCard>      
          ))}
        </IonList>
      </IonContent>
    </IonPage>
    
  );
};

export default Event;
