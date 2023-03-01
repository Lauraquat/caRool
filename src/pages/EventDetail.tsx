import { IonContent,  IonBackButton, IonPage, IonTitle, IonToolbar,IonButton} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { dataEvents } from '../dataBdd';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
import 'firebase/app';
import 'firebase/firestore';

import './style.css';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<dataEvents>();

  useEffect(() => {
    async function getEvent() {
      const eventDoc = doc(db, 'event', id);
      console.log(eventDoc)
      const eventSnapshot = await getDoc(eventDoc);
      if (!eventSnapshot.exists) {
        // const eventData = eventSnapshot.data() as dataEvents;
        // setEvent(eventData);
        console.log('test');
      }
      setEvent(eventSnapshot.data() as dataEvents)
    }
    getEvent();
  }, []);


  return (
    <IonPage>
      <IonToolbar>
        <IonButton slot="start"><IonBackButton defaultHref="/home"/></IonButton>
        <IonTitle>{event?.titre}</IonTitle>
      </IonToolbar>
      <IonContent id="contentTest" fullscreen>
        <h2>{event?.titre}</h2>
        <p>{event?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;




