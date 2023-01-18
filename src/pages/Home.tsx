import { IonContent, IonHeader, IonPage, IonTitle, IonCardHeader,IonCardTitle,IonImg, IonCardSubtitle, IonToolbar, IonButton, IonCard, IonCardContent, IonList } from '@ionic/react';

import './style.css';

const Home: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  fullscreen>
        <IonHeader collapse="condense">
          <IonButton class='button'>Réserver un vélo</IonButton>
          <IonToolbar>
            <IonTitle>Évènement à venir</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
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
        </IonList>
      </IonContent>
    </IonPage>
    
  );
};

export default Home;


