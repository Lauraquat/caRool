import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonImg,IonButton,IonCardSubtitle, IonCardContent, IonCardTitle} from '@ionic/react';
import './style.css';

const Event: React.FC = () => {
  return (
    <IonPage>
      <IonContent id="contentTest" fullscreen>
          <IonCard>
            <IonCardHeader class='cardHeader'>
              <IonImg class='cardImg' src='https://images.pexels.com/photos/161172/cycling-bike-trail-sport-161172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''></IonImg>
            </IonCardHeader>
            <IonCardContent class='cardContent'>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              Here's a small text description for the card content. Nothing more, nothing less.
              <IonButton class='cardButton'>En savoir +</IonButton>
            </IonCardContent>
          </IonCard>      
        </IonContent>
    </IonPage>
  );
};

export default Event;




