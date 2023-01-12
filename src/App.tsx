import { Redirect, Route } from 'react-router-dom';
import {  IonApp,  IonIcon,  IonLabel,  IonRouterOutlet,  IonTabBar,  IonTabButton,  IonTabs,  IonHeader,  IonToolbar,  setupIonicReact,  IonImg} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, square, home } from 'ionicons/icons';
import Home from './pages/Home';
import Event from './pages/Event';
import Location from './pages/Location';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
        <IonToolbar>
          <IonImg class='logo' src='../../assets/icon/logo.svg' alt='logo ça Rool'></IonImg>
        </IonToolbar>
      </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/event">
            <Event />
          </Route>
          <Route path="/location">
            <Location />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="event" href="/event">
            <IonIcon icon={calendar} />
            <IonLabel>Event</IonLabel>
          </IonTabButton>
          <IonTabButton tab="location" href="/location">
            <IonIcon icon={square} />
            <IonLabel>Location</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
