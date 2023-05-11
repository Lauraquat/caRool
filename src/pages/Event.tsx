import { IonCard, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonCardHeader,IonCardTitle,IonCardSubtitle, IonToolbar, IonButton, IonCardContent, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';
import { collection, getDocs , addDoc} from 'firebase/firestore/lite';
import { barbellOutline, bicycleOutline, hourglassOutline, trendingUpOutline } from 'ionicons/icons';
import { db } from '../firebaseConfig';
import 'firebase/app';
import 'firebase/firestore';
import { dataEvents, dataUsers } from '../dataBdd';

import './style.css';
import { useCurrentUser } from '../hooks/UserHook';
import { useHistory } from 'react-router';

const Event: React.FC = () => {
  // const user = useCurrentUser();
  const navigate = useHistory();
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
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  fullscreen>
          <IonButton class='mt-1 py-1'  onClick={(e) => {
          e.preventDefault();
          navigate.push('/location');
        }}>Réserver un vélo</IonButton>
            <IonToolbar>
              <IonTitle class='py-1' >Évènement à venir</IonTitle>
            </IonToolbar>
        <IonList class='py-1'>
          {events.map((event)=>  (
            <IonCard key={event.id} routerLink={`/event/${event.id}`}>
                <img src={event.photo} alt=''></img>
                <IonCardHeader>
                  <IonCardSubtitle>{event.date.toDate().toLocaleDateString()}</IonCardSubtitle>
                  <IonCardTitle>{event.titre}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class='card-content'>
                  {event.intro}<br />
                  <div>
                    <IonIcon icon={hourglassOutline} size="large"></IonIcon>
                    {event.duree}
                  </div>
                  <div>
                    <IonIcon icon={bicycleOutline} size="large"></IonIcon>
                    {event.kilometre} <br />
                  </div>
                  <div>
                    <IonIcon icon={barbellOutline} size="large"></IonIcon>
                    {event.difficulte}
                  </div>
                  <div>
                    <IonIcon icon={trendingUpOutline} size="large"></IonIcon>
                    {event.denivele}
                  </div>
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