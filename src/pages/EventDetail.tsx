import { IonContent,IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { barbellOutline, bicycleOutline, hourglassOutline, trendingUpOutline , trailSignOutline,  locationOutline} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { dataEvents } from '../dataBdd';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
import 'firebase/app';
import 'firebase/firestore';

import "./style.css";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<dataEvents>();

  useEffect(() => {
    async function getEvent() {
      const eventDoc = doc(db, "event", id);
      const eventSnapshot = await getDoc(eventDoc);
      if (!eventSnapshot.exists) {
        // const eventData = eventSnapshot.data() as dataEvents;
        // setEvent(eventData);
      }
      setEvent(eventSnapshot.data() as dataEvents);
    }
    getEvent();
  }, []);

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>{event?.titre}</IonTitle>
      </IonToolbar>
      <IonContent id="contentTest" fullscreen>
        <img src={event?.photo} alt="" />
        <section className='event-detail-content'>
          <h1>{event?.titre}</h1>
          <p>{event?.date.toDate().toLocaleDateString()}</p>
          <div className='little-info'>
            {event?.duree &&(
              <div>
                <IonIcon icon={hourglassOutline} size="large"></IonIcon>
                {event?.duree}
              </div>
            )}
            {event?.kilometre &&(
              <div>
              <IonIcon icon={bicycleOutline} size="large"></IonIcon>
              {event?.kilometre} <br />
              </div>
            )}
            {event?.difficulte && (
              <div>
                <IonIcon icon={barbellOutline} size="large"></IonIcon>
                {event?.difficulte}
              </div>
            )}
            {event?.denivele && (
            <div>
              <IonIcon icon={trendingUpOutline} size="large"></IonIcon>
              {event?.denivele}
            </div>
            )}
          </div>
          <p>{event?.description}</p>
          {event?.itineraire &&(
            <p><IonIcon icon={trailSignOutline}></IonIcon> : {event?.itineraire}</p>
          )}
          {event?.typeVelo &&(
          <p><IonIcon icon={bicycleOutline}></IonIcon> : {event?.typeVelo}</p>
          )}
          {event?.depart &&(
          <p><IonIcon icon={locationOutline}></IonIcon> : {event?.depart}</p>
          )}
        </section>
      
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;
