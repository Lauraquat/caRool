import { IonContent, IonPage } from '@ionic/react';
import { showTabBar } from '../App';
import './style.css';

const Event: React.FC = () => {
  showTabBar();
  
  
  return (
    <IonPage>
       <IonContent id="contentTest" fullscreen>
            
        </IonContent>
    </IonPage>
  );


  
};

export default Event;