import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonToolbar,
  IonButton,
  IonCardContent,
  IonList,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { dataEvents } from "../dataBdd";
import "firebase/app";
import "firebase/firestore";

import "./style.css";

const Event: React.FC = () => {
  const [events, setEvents] = useState<dataEvents[]>([]);

  //Récupération de tous les évènements en BDD
  async function getEvents() {
    const eventCol = collection(db, "event");
    const eventSnapshot = await getDocs(eventCol);
    const eventLists = eventSnapshot.docs.map((doc) => {
      const event = doc.data() as dataEvents;
      event.id = doc.id;
      return event;
    });
    return eventLists;
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton class="mt-1 py-1">Réserver un vélo</IonButton>
        <IonToolbar>
          <IonTitle class="py-1">Évènement à venir</IonTitle>
        </IonToolbar>
        <IonList class="py-1">
          {events.map((event) => (
            <IonCard key={event.id} routerLink={`/event/${event.id}`}>
              <img src={event.photo} alt=""></img>
              <IonCardHeader>
                <IonCardTitle>{event.titre}</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                {event.description}
                <IonButton class="cardButton">En savoir +</IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Event;
