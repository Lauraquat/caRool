import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonImg, IonPage } from '@ionic/react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
import 'firebase/app';
import 'firebase/firestore';

import './style.css';


const Location: React.FC = () => {

  getEvent();
  async function getEvent() {
    const eventCol = collection(db, 'event');
    const eventSnapshot = await getDocs(eventCol);
    const eventLists = eventSnapshot.docs.map(doc => doc.data());
    console.log(eventLists);
    return eventLists 
  }
  
  async function showData() {
    // const docRef = collection(db, 'srv').doc('Selected Items');
    // console.log(docRef)
    // tslint:disable-next-line:member-ordering
    // docRef.get().then((doc) => {
    //   const details = doc.data();

    //   if (doc.exists) {
    //     console.log('Document data:', doc.data());
    //     this.detail = details;
    //     console.log('document2', this.detail);
    //     this.detail1 =this.detail['n'];
    //     console.log('document3', this.detail['n']);

    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log('No such document!');
    // }
    // }).catch((error) => {
    // console.log('Error getting document:', error);
    // });
  }

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
              <IonButton class='cardButton'></IonButton>
            </IonCardContent>
          </IonCard>      
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