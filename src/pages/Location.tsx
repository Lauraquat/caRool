import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonImg, IonPage } from '@ionic/react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
import 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dataEvents } from '../dataBdd';
import './style.css';


const Location: React.FC = () => {
  const [events, setEvents] = useState<dataEvents[]>([]);

    async function getEvents() {
      const eventCol = collection(db, 'event');
      const eventSnapshot = await getDocs(eventCol);
      const eventLists = eventSnapshot.docs.map( doc => doc.data() as dataEvents);
       return eventLists ;
    }
    
    useEffect(() => {
      async function fetchEvents() {
        const events = await getEvents();
        setEvents(events);
      }
      fetchEvents();
    }, []);

  return (
    <IonPage>
       <IonContent id="contentTest" fullscreen>
            {events.map((event, index)=> (
          <IonCard key={index}>
            <IonCardHeader class='cardHeader'>
              <IonImg class='cardImg' src={event.photo} alt=''></IonImg>
            </IonCardHeader>
              <IonCardContent class='cardContent'>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              Here's a small text description for the card content. Nothing more, nothing less.
              <IonButtons class='cardButton'></IonButtons>
            </IonCardContent>
            
          </IonCard>      
            ))}
        </IonContent>
    </IonPage>
  );
  
};

export default Location;




// return (
        //       <ul>
        //         {eventLists.map(eventList => (
        //           <p key={eventList.toString()}>{eventList.description}</p>
        //         ))}
        //       </ul>
        // )